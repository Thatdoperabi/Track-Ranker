import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Track } from '../../models/track.model';
import { TrackService } from '../../services/track.service';
import { TrackCardComponent } from '../track-card/track-card.component';
import { ContactModalComponent } from '../contact-modal/contact-modal.component';

@Component({
  selector: 'app-track-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TrackCardComponent, ContactModalComponent],
  templateUrl: './track-list.component.html',
  styleUrls: ['./track-list.component.css']
})
export class TrackListComponent implements OnInit {
  tracks: Track[] = [];
  filteredTracks: Track[] = [];
  loading = true;
  error = false;
  showContactModal = false;
  showSnackbar = false;
  snackbarMessage = '';

  // Filter properties
  searchTerm = '';
  selectedState = '';
  selectedDifficulty = '';
  difficultyRange = { min: 0, max: 10 };
  sortBy = 'name';
  sortOrder: 'asc' | 'desc' = 'asc';

  // Available states for filter
  states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
    'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
    'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
    'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
    'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
    'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
    'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
    'Wisconsin', 'Wyoming'
  ];

  constructor(private trackService: TrackService) {}

  ngOnInit(): void {
    this.loadTracks();
  }

  loadTracks(): void {
    this.loading = true;
    this.error = false;
    
    this.trackService.getTracks().subscribe({
      next: (tracks: Track[]) => {
        this.tracks = tracks;
        this.filteredTracks = tracks;
        this.loading = false;
        console.log('Loaded tracks:', tracks);
      },
      error: (error: any) => {
        console.error('Error loading tracks:', error);
        this.error = true;
        this.loading = false;
      }
    });
  }

  applyFilters(): void {
    let filtered = [...this.tracks];

    // Search filter
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(track => 
        (track.name?.toLowerCase().includes(term)) ||
        (track.city?.toLowerCase().includes(term)) ||
        (track.state?.toLowerCase().includes(term))
      );
    }

    // State filter
    if (this.selectedState) {
      filtered = filtered.filter(track => track.state === this.selectedState);
    }

    // Difficulty range filter
    filtered = filtered.filter(track => {
      const rating = track.averageUserRating || track.aiDifficultyRating || 0;
      return rating >= this.difficultyRange.min && rating <= this.difficultyRange.max;
    });

    // Sort
    this.sortTracks(filtered);

    this.filteredTracks = filtered;
  }

  sortTracks(tracks: Track[]): void {
    tracks.sort((a, b) => {
      let aValue: any, bValue: any;

      switch (this.sortBy) {
        case 'name':
          aValue = a.name || '';
          bValue = b.name || '';
          break;
        case 'state':
          aValue = a.state || '';
          bValue = b.state || '';
          break;
        case 'difficulty':
          aValue = a.averageUserRating || a.aiDifficultyRating || 0;
          bValue = b.averageUserRating || b.aiDifficultyRating || 0;
          break;
        case 'reviews':
          aValue = a.numberOfReviews || 0;
          bValue = b.numberOfReviews || 0;
          break;
        default:
          aValue = a.name || '';
          bValue = b.name || '';
      }

      if (this.sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }

  openContactModal(): void {
    this.showContactModal = true;
  }

  closeContactModal(): void {
    this.showContactModal = false;
  }

  onShowSnackbar(message: string): void {
    this.snackbarMessage = message;
    this.showSnackbar = true;
    setTimeout(() => {
      this.showSnackbar = false;
    }, 3000);
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  onStateChange(): void {
    this.applyFilters();
  }

  onDifficultyChange(): void {
    this.applyFilters();
  }

  onSortChange(): void {
    this.applyFilters();
  }

  toggleSortOrder(): void {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.applyFilters();
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedState = '';
    this.difficultyRange = { min: 0, max: 10 };
    this.sortBy = 'name';
    this.sortOrder = 'asc';
    this.applyFilters();
  }
} 