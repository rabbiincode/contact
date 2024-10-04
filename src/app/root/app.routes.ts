import { Routes } from '@angular/router';
import { DashboardComponent } from '../modules/dashboard/dashboard.component';
import { AddContactComponent } from '../modules/add-contact/add-contact.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'add-contact', component: AddContactComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];
