import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/employees', pathMatch: 'full' },
  { 
    path: 'employees', 
    loadComponent: () => import('./components/employee-list/employee-list.component')
      .then(m => m.EmployeeListComponent)
  },
  { 
    path: 'employee/create', 
    loadComponent: () => import('./components/employee-form/employee-form.component')
      .then(m => m.EmployeeFormComponent)
  },
  { 
    path: 'employee/edit/:id', 
    loadComponent: () => import('./components/employee-form/employee-form.component')
      .then(m => m.EmployeeFormComponent)
  },
  { 
    path: 'import', 
    loadComponent: () => import('./components/xml-import/xml-import.component')
      .then(m => m.XmlImportComponent)
  }
];