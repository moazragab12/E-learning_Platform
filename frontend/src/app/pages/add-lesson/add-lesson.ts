import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-lesson',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-lesson.html',
  styleUrls: ['./add-lesson.css']
})
export class AddLessonComponent implements OnInit {
  lessonForm: FormGroup;
  isInstructor: boolean = false;
  courseId: string | null = null;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private route: ActivatedRoute) {
    this.lessonForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      order: [0, Validators.required],
      resources: [[]]
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.courseId = params.get('courseId');
      if (!this.courseId) {
        this.router.navigate(['/course-list']);
        return;
      }
    });
    this.checkInstructor();
    if (!this.isInstructor) {
      this.router.navigate(['/course-content', this.courseId || '']);
    }
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

  onSubmit() {
    if (this.lessonForm.valid && this.courseId) {
      let resources = this.lessonForm.value.resources;
      if (typeof resources === 'string') {
        try {
          resources = JSON.parse(resources);
        } catch (e) {
          alert('Resources must be a valid JSON array.');
          return;
        }
      }
      const lessonData = { ...this.lessonForm.value, resources, courseId: this.courseId };
      this.auth.createLesson(lessonData).subscribe({
        next: () => this.router.navigate(['/course-content', this.courseId]),
        error: err => alert('Failed to create lesson: ' + (err.error?.message || err.message))
      });
    }
  }

  cancel() {
    this.router.navigate(['/course-content', this.courseId]);
  }
} 