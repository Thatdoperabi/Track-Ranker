import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Track } from '../../models/track.model';
import { TrackImageService } from '../../services/track-image.service';

@Component({
  selector: 'app-track-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './track-card.component.html',
  styleUrls: ['./track-card.component.css']
})
export class TrackCardComponent {
  @Input() track!: Track;

  constructor(
    private router: Router,
    private trackImageService: TrackImageService
  ) {}

  getDifficultyColor(rating: number): string {
    if (rating <= 3) return '#27ae60'; // Green for easy
    if (rating <= 6) return '#f39c12'; // Orange for medium
    return '#e74c3c'; // Red for hard
  }

  getDifficultyText(rating: number): string {
    if (rating <= 3) return 'Easy';
    if (rating <= 6) return 'Medium';
    return 'Hard';
  }

  onTrackClick(): void {
    if (this.track && this.track.id) {
      console.log('Navigating to track:', this.track.id); // Debug log
      this.router.navigate(['/tracks', this.track.id]);
    } else {
      console.log('Cannot navigate - track or track.id is missing:', this.track);
    }
  }

  getDisplayRating(): number {
    if (!this.track) return 0;
    // Use averageUserRating (which includes AI rating) as primary, fallback to aiDifficultyRating
    const rating = this.track.averageUserRating || this.track.aiDifficultyRating || 0;
    return Math.round(rating); // Round to whole number
  }

  getDisplayImage(): string {
    if (!this.track) {
      return this.trackImageService.getTrackLayoutImage('Track');
    }
    
    // Use satellite image if coordinates are available
    if (this.track.latitude && this.track.longitude) {
      return this.trackImageService.getSatelliteImage(this.track.latitude, this.track.longitude);
    }
    
    // Fallback to track layout image if available
    if (this.track.trackLayoutImageUrl) {
      return this.track.trackLayoutImageUrl;
    }
    
    // Final fallback to placeholder
    return this.trackImageService.getTrackLayoutImage(this.track.name || 'Track');
  }

  onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    if (target) {
      target.src = this.trackImageService.getFallbackImage();
    }
  }

  // Helper methods to safely access track properties
  getTrackName(): string {
    return this.track ? this.track.name || 'Unknown Track' : 'Unknown Track';
  }

  getTrackLocation(): string {
    if (!this.track) return 'Unknown, Unknown';
    const city = this.track.city || 'Unknown';
    const state = this.track.state || 'Unknown';
    return `${city}, ${state}`;
  }

  getNumberOfReviews(): number {
    return this.track ? this.track.numberOfReviews || 0 : 0;
  }

  getTrackLength(): number | null {
    return this.track ? this.track.trackLength || null : null;
  }

  getNumberOfTurns(): number | null {
    return this.track ? this.track.numberOfTurns || null : null;
  }

  getSurfaceType(): string | null {
    return this.track ? this.track.surfaceType || null : null;
  }
} 