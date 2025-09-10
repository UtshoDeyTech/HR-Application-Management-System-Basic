import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container">
        <a class="navbar-brand" routerLink="/employees">HR Management System</a>
        <div class="navbar-nav ms-auto">
          <a class="nav-link" routerLink="/employees">Employees</a>
          <a class="nav-link" routerLink="/employee/create">Add Employee</a>
          <a class="nav-link" routerLink="/import">Import XML</a>
        </div>
      </div>
    </nav>
    
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {
  title = 'HR Management System';
}