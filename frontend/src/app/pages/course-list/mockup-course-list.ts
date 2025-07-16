import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-mockup-course-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mockup-course-list.html',
  styleUrls: ['./mockup-course-list.css']
})
export class MockupCourseListComponent implements OnInit {
  courses: any[] = [];
  loading = false;
  error: string | null = null;
  myUserId: string | null = null;

  constructor(private router: Router, private auth: AuthService) {}

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
    this.loading = true;
    this.auth.getCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.message || 'Failed to load courses';
        this.loading = false;
      }
    });
  }

  selectCourse(courseId: string) {
    this.router.navigate(['/course-content', courseId]);
  }
} 