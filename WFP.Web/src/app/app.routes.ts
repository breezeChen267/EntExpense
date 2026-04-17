import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/expense/expense-form.component').then(m => m.ExpenseFormComponent)
  }
];
