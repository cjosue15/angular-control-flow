import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component'),
  },
  {
    path: 'search',
    loadComponent: () => import('./pages/search/search.component'),
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
