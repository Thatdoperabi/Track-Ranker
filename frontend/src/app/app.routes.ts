import { Routes } from '@angular/router';
import { TrackListComponent } from './components/track-list/track-list.component';
import { TrackDetailComponent } from './components/track-detail/track-detail.component';
import { TrackSuggestionComponent } from './components/track-suggestion/track-suggestion.component';

export const routes: Routes = [
  { path: '', component: TrackListComponent },
  { path: 'tracks', component: TrackListComponent },
  { path: 'tracks/:id', component: TrackDetailComponent },
  { path: 'suggest-track', component: TrackSuggestionComponent },
  { path: '**', redirectTo: '' }
]; 