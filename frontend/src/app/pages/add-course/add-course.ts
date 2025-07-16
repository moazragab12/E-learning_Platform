import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-course.html',
  styleUrls: ['./add-course.css']
})
export class AddCourseComponent implements OnInit {
  courseForm: FormGroup;
  loading = false;
  isInstructor = false;
  isLoggedIn = false;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      categories: [''],
    });
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    this.isLoggedIn = !!token;
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.isInstructor = payload.role === 'instructor';
      } catch {
        this.isInstructor = false;
      }
    }
    if (!this.isLoggedIn || !this.isInstructor) {
      alert('Only logged-in instructors can add courses.');
      this.router.navigate(['/home']);
    }
  }

  onSubmit() {
    if (this.courseForm.valid) {
      this.loading = true;
      // Parse categories as array
      let categories = this.courseForm.value.categories;
      if (typeof categories === 'string') {
        categories = categories.split(',').map((c: string) => c.trim()).filter((c: string) => c);
      }
      // Get instructorId from token
      const token = localStorage.getItem('token');
      let instructorId = '';
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          instructorId = payload.userId;
        } catch {}
      }
      const courseData = { ...this.courseForm.value, categories, instructorId };
      this.auth.createCourse(courseData).subscribe({
        next: () => this.router.navigate(['/course-list']),
        error: err => {
          alert('Failed to create course: ' + (err.error?.message || err.message));
          this.loading = false;
        }
      });
    }
  }
} 