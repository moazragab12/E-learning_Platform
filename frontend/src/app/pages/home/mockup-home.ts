import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mockup-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mockup-home.html',
  styleUrls: ['./mockup-home.css']
})
export class MockupHomeComponent implements OnInit {
  isInstructor = false;
  isLoggedIn = false;

  constructor(private router: Router) {}

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
  }

  goToAddCourse() {
    this.router.navigate(['/add-course']);
  }
} 