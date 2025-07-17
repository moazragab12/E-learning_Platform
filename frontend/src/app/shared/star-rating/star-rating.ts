import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './star-rating.html',
  styleUrls: ['./star-rating.css'],
})
export class StarRatingComponent {
  @Input() rating = 0;
  @Output() ratingChange = new EventEmitter<number>();

  stars: number[] = [1, 2, 3, 4, 5];
  tempRating = 0;

  handleClick(rate: number) {
    this.rating = rate;
    this.ratingChange.emit(this.rating);
  }

  handleMouseEnter(rate: number) {
    this.tempRating = rate;
  }

  handleMouseLeave() {
    this.tempRating = 0;
  }

  isFull(i: number): boolean {
    return this.tempRating ? this.tempRating >= i : this.rating >= i;
  }
}
