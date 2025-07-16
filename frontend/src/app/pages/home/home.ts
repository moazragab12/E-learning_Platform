import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { CourseService, Course } from '../../course.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, NgIf,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatGridListModule,
    MatIconModule,
    HttpClientModule,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})

export class HomeComponent implements OnInit {
  courses: Course[] = [];
  loading = true;
  error: string | null = null;

  constructor(private courseService: CourseService) { }

  ngOnInit() {
    this.loadTopCourses();
  }

  loadTopCourses() {
    this.courseService.getTopCourses(6).subscribe({
      next: (courses) => {
        this.courses = courses;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading courses:', error);
        this.error = 'Failed to load courses';
        this.loading = false;
        // Fallback to sample data if API fails
        this.courses = [
          {
            _id: '1',
            title: 'Introduction to Angular',
            description: 'Learn the basics of Angular and how to build modern web apps.',
            imageUrl: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop',
            instructorId: {
              _id: '1',
              profile: { firstName: 'John', lastName: 'Doe' }
            },
            categories: ['Web Development'],
            published: true,
            averageRating: 4.5,
            feedbackCount: 10,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            _id: '2',
            title: 'Java for Beginners',
            description: 'Start your journey into Java programming and OOP concepts.',
            imageUrl: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&h=250&fit=crop',
            instructorId: {
              _id: '2',
              profile: { firstName: 'Jane', lastName: 'Smith' }
            },
            categories: ['Programming'],
            published: true,
            averageRating: 4.2,
            feedbackCount: 8,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            _id: '3',
            title: 'Web Development Essentials',
            description: 'Understand HTML, CSS, and JavaScript to build responsive websites.',
            imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop',
            instructorId: {
              _id: '3',
              profile: { firstName: 'Bob', lastName: 'Johnson' }
            },
            categories: ['Web Development'],
            published: true,
            averageRating: 4.8,
            feedbackCount: 15,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ];
      }
    });
  }

  onImageError(event: any) {
    // Set a fallback image if the course image fails to load
    event.target.src = 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop';
  }
}
