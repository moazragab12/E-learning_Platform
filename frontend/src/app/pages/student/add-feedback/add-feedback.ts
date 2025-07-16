import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from '../../../shared/star-rating/star-rating';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatLabel } from '@angular/material/form-field';

@Component({
  selector: 'app-add-feedback',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    StarRatingComponent,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatLabel,
    MatSlideToggleModule,
  ],
  templateUrl: './add-feedback.html',
  styleUrls: ['./add-feedback.css'],
})
export class AddFeedback implements OnInit {
  feedbackForm!: FormGroup;
  courseId!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id') || '';
    this.feedbackForm = this.fb.group({
      rating: [0, [Validators.required, Validators.min(1), Validators.max(5)]],
      comment: ['', [Validators.required, Validators.minLength(10)]],
      // userId: JSON.parse(localStorage.getItem('token')!)?.id,
      userId: ['686935cb4d06ced526a7df3b', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.feedbackForm.invalid) return;

    const feedback = {
      ...this.feedbackForm.value,
      courseId: this.courseId,
    };
    console.log('Feedback payload:', feedback);

    this.http.post('http://localhost:3000/api/feedback', feedback).subscribe({
      next: () => alert('Feedback submitted successfully'),
      error: (err) => alert('Error: ' + err.message),
    });
  }
}
