import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-content',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './course-content.html',
  styleUrls: ['./course-content.css']
})
export class CourseContentComponent implements OnInit {
  lessons: any[] = [];
  lessonForm: FormGroup;
  editingLessonId: string | null = null;
  isInstructor: boolean = false;
  isLoggedIn: boolean = false;
  courseId: string | null = null;
  myUserId: string | null = null;
  isCourseOwner: boolean = false;
  course: any = null;
  editingCourse = false;
  courseEditForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private route: ActivatedRoute) {
    this.lessonForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      order: [0, Validators.required],
      resources: ['']
    });
    this.courseEditForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      categories: ['']
    });
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.myUserId = payload.userId;
      } catch {
        this.myUserId = null;
      }
    }
    this.route.paramMap.subscribe(params => {
      this.courseId = params.get('courseId');
      if (!this.courseId) {
        this.router.navigate(['/course-list']);
        return;
      }
      // Fetch course to check ownership
      this.auth.getCourseById(this.courseId).subscribe({
        next: (course) => {
          this.course = course;
          console.log('Fetched course:', course, 'myUserId:', this.myUserId);
          this.isCourseOwner = !!(
            this.myUserId &&
            course.instructorId &&
            (
              (typeof course.instructorId === 'string' && course.instructorId === this.myUserId) ||
              (typeof course.instructorId === 'object' && course.instructorId._id === this.myUserId)
            )
          );
        },
        error: () => {
          this.isCourseOwner = false;
        }
      });
      this.loadLessons();
    });
    this.checkInstructor();
    this.checkLoggedIn();
  }

  checkLoggedIn() {
    this.isLoggedIn = !!localStorage.getItem('token');
  }

  checkInstructor() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.isInstructor = false;
      return;
    }
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.isInstructor = payload.role === 'instructor';
    } catch {
      this.isInstructor = false;
    }
  }

  loadLessons() {
    this.auth.getLessons().subscribe({
      next: (res: any) => this.lessons = res,
      error: err => alert('Failed to load lessons: ' + (err.error?.message || err.message))
    });
  }

  onSubmit() {
    if (this.lessonForm.valid && this.isInstructor) {
      let resources = this.lessonForm.value.resources;
      if (typeof resources === 'string') {
        try {
          resources = resources ? JSON.parse(resources) : [];
        } catch (e) {
          alert('Resources must be a valid JSON array.');
          return;
        }
      }
      const lessonData = { ...this.lessonForm.value, resources };
      if (this.editingLessonId) {
        this.auth.updateLesson(this.editingLessonId, lessonData).subscribe({
          next: () => { this.loadLessons(); this.lessonForm.reset(); this.editingLessonId = null; },
          error: err => alert('Failed to update lesson: ' + (err.error?.message || err.message))
        });
      } else {
        this.auth.createLesson(lessonData).subscribe({
          next: () => { this.loadLessons(); this.lessonForm.reset(); },
          error: err => alert('Failed to create lesson: ' + (err.error?.message || err.message))
        });
      }
    }
  }

  editLesson(lesson: any) {
    if (!this.isInstructor) return;
    this.lessonForm.patchValue({
      ...lesson,
      resources: lesson.resources ? JSON.stringify(lesson.resources, null, 2) : '[]'
    });
    this.editingLessonId = lesson._id;
  }

  deleteLesson(id: string) {
    if (!this.isInstructor) return;
    if (confirm('Are you sure you want to delete this lesson?')) {
      this.auth.deleteLesson(id).subscribe({
        next: () => this.loadLessons(),
        error: err => alert('Failed to delete lesson: ' + (err.error?.message || err.message))
      });
    }
  }

  cancelEdit() {
    this.lessonForm.reset();
    this.editingLessonId = null;
  }

  goToAddLesson() {
    if (this.courseId) {
      this.router.navigate(['/add-lesson', this.courseId]);
    }
  }

  editCourse() {
    if (!this.course) return;
    this.editingCourse = true;
    this.courseEditForm.patchValue({
      title: this.course.title,
      description: this.course.description,
      categories: Array.isArray(this.course.categories) ? this.course.categories.join(', ') : ''
    });
  }

  cancelEditCourse() {
    this.editingCourse = false;
  }

  saveCourseEdit() {
    if (this.courseEditForm.valid && this.course) {
      const { title, description, categories } = this.courseEditForm.value;
      const updateData = {
        title,
        description,
        categories: typeof categories === 'string' ? categories.split(',').map((c: string) => c.trim()).filter((c: string) => c) : []
      };
      this.auth.updateCourse(this.course._id, updateData).subscribe({
        next: (updated) => {
          this.course = updated;
          this.editingCourse = false;
          // Optionally reload course list or show a message
        },
        error: err => alert('Failed to update course: ' + (err.error?.message || err.message))
      });
    }
  }

  deleteCourse() {
    if (this.course && confirm('Are you sure you want to delete this course?')) {
      this.auth.deleteCourse(this.course._id).subscribe({
        next: () => this.router.navigate(['/course-list']),
        error: err => alert('Failed to delete course: ' + (err.error?.message || err.message))
      });
    }
  }
} 