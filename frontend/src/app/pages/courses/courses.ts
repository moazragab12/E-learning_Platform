import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-student-courses',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './courses.html',
  styleUrls: ['./courses.css'],
})
export class StudentCourses implements OnInit {
  courses: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:3000/api/courses').subscribe({
      next: (res) => {
        this.courses = res.map((course) => ({
          ...course,
          image: course.image || 'https://via.placeholder.com/300x180',
        }));
      },
      error: (err) => console.error('Error fetching courses:', err),
    });
  }
}
