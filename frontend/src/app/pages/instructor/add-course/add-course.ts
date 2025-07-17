import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatButtonModule,
  ],
  templateUrl: './add-course.html',
  styleUrls: ['./add-course.css'],
})
export class AddCourse implements OnInit {
  courseForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      categories: [''],
      image: ['', Validators.required],
      published: [false],
      // instructorId: JSON.parse(localStorage.getItem('token')!)?.id,
      instructorId: ['686935cb4d06ced526a7df3b', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.courseForm.invalid) return;

    const formValue = this.courseForm.value;

    // split categories string into array
    const categoriesArray = formValue.categories
      ? formValue.categories.split(',').map((cat: string) => cat.trim())
      : [];

    const course = {
      ...formValue,
      categories: categoriesArray,
    };
    console.log('Course payload:', course);

    this.http.post('http://localhost:3000/api/courses', course).subscribe({
      next: () => {
        alert('Course added successfully');
        this.router.navigate(['/']);
      },
      error: (err) => {
        alert('Error: ' + err.message);
      },
    });
  }
}
