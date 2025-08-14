import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Track, TrackReview } from '../../models/track.model';
import { TrackService } from '../../services/track.service';

@Component({
  selector: 'app-track-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [TrackService],
  templateUrl: './track-detail.component.html',
  styleUrls: ['./track-detail.component.css']
})
export class TrackDetailComponent implements OnInit {
  track: Track | null = null;
  reviews: TrackReview[] = [];
  loading = true;
  error = '';
  showReviewForm = false;
  submittingReview = false;
  
  // Review form properties
  reviewForm = {
    userName: '',
    userDifficultyRating: 5, // This is already 5, which is good
    userReviewText: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private trackService: TrackService
  ) {}

  ngOnInit(): void {
    const trackId = Number(this.route.snapshot.paramMap.get('id'));
    if (!trackId) {
      this.error = 'Invalid track ID';
      this.loading = false;
      return;
    }
    this.loadTrackAndReviews(trackId);
  }

  loadTrackAndReviews(trackId: number): void {
    this.trackService.getTrack(trackId).subscribe({
      next: (track) => {
        this.track = track;
        this.loadReviews(trackId);
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load track details.';
        this.loading = false;
      }
    });
  }

  loadReviews(trackId: number): void {
    this.trackService.getTrackReviews(trackId).subscribe({
      next: (reviews) => {
        this.reviews = reviews;
        // Always add AI review if track has AI rating (at the end)
        if (this.track?.aiDifficultyRating) {
          const aiReview: TrackReview = {
            id: 0,
            trackId: trackId,
            userName: 'AI Assessment',
            userDifficultyRating: this.track.aiDifficultyRating,
            userReviewText: this.track.aiDifficultyExplanation || 'AI-generated difficulty assessment based on track characteristics.',
            reviewDate: new Date()
          };
          // Add AI review to the end of the list
          this.reviews.push(aiReview);
        }
      },
      error: (error) => {
        console.error('Failed to load reviews:', error);
        // Fallback to AI review only
        if (this.track?.aiDifficultyRating) {
          this.reviews = [{
            id: 0,
            trackId: trackId,
            userName: 'AI Assessment',
            userDifficultyRating: this.track.aiDifficultyRating,
            userReviewText: this.track.aiDifficultyExplanation || 'AI-generated difficulty assessment based on track characteristics.',
            reviewDate: new Date()
          }];
        }
      }
    });
  }

  toggleReviewForm(): void {
    this.showReviewForm = !this.showReviewForm;
  }

  submitReview(): void {
    if (!this.track || !this.reviewForm.userName.trim() || !this.reviewForm.userReviewText.trim()) {
      return;
    }

    this.submittingReview = true;

    const newReview: TrackReview = {
      id: 0, // Will be set by backend
      trackId: this.track.id!,
      userName: this.reviewForm.userName.trim(),
      userDifficultyRating: this.reviewForm.userDifficultyRating,
      userReviewText: this.reviewForm.userReviewText.trim(),
      reviewDate: new Date()
    };

    this.trackService.submitReview(this.track.id!, newReview).subscribe({
      next: (savedReview) => {
        // Add the new review to the list
        this.reviews.unshift(savedReview);
        
        // Reset form
        this.reviewForm = {
          userName: '',
          userDifficultyRating: 5,
          userReviewText: ''
        };
        this.showReviewForm = false;
        this.submittingReview = false;
      },
      error: (error) => {
        console.error('Failed to submit review:', error);
        this.submittingReview = false;
        // You could add a user-friendly error message here
      }
    });
  }

  getAverageDifficulty(): number {
    // Use the averageUserRating from the database (which includes AI rating)
    return this.track?.averageUserRating ? Math.round(this.track.averageUserRating) : 0;
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  getDifficultyColor(rating?: number): string {
    if (!rating) return '#888';
    if (rating <= 3) return '#27ae60';
    if (rating <= 6) return '#f39c12';
    return '#e74c3c';
  }

  getDifficultyText(rating?: number): string {
    if (!rating) return 'Unknown';
    if (rating <= 3) return 'Easy';
    if (rating <= 6) return 'Medium';
    return 'Hard';
  }
} 