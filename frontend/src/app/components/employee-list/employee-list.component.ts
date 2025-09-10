import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <h4>Employee Management</h4>
          </div>
          <div class="card-body">
            <!-- Search Section -->
            <div class="row mb-3">
              <div class="col-md-6">
                <div class="input-group">
                  <input 
                    type="text" 
                    class="form-control" 
                    placeholder="Search by name..."
                    [(ngModel)]="searchTerm"
                    (keyup.enter)="searchEmployees()">
                  <button 
                    class="btn btn-outline-secondary" 
                    type="button"
                    (click)="searchEmployees()">
                    Search
                  </button>
                </div>
              </div>
              <div class="col-md-6 text-end">
                <button 
                  class="btn btn-secondary me-2"
                  (click)="loadAllEmployees()">
                  Show All
                </button>
                <a routerLink="/employee/create" class="btn btn-primary">
                  Add Employee
                </a>
              </div>
            </div>

            <!-- Alert Messages -->
            <div *ngIf="message" class="alert alert-success alert-dismissible fade show">
              {{ message }}
              <button type="button" class="btn-close" (click)="message = ''"></button>
            </div>

            <div *ngIf="errorMessage" class="alert alert-danger alert-dismissible fade show">
              {{ errorMessage }}
              <button type="button" class="btn-close" (click)="errorMessage = ''"></button>
            </div>

            <!-- Loading Spinner -->
            <div *ngIf="loading" class="text-center">
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>

            <!-- Employee Table -->
            <div *ngIf="!loading && employees.length > 0" class="table-responsive">
              <table class="table table-striped table-hover">
                <thead class="table-dark">
                  <tr>
                    <th>Employee ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Division</th>
                    <th>Building</th>
                    <th>Title</th>
                    <th>Room</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let employee of employees">
                    <td>{{ employee.employeeId }}</td>
                    <td>{{ employee.firstName }}</td>
                    <td>{{ employee.lastName }}</td>
                    <td>{{ employee.division || 'N/A' }}</td>
                    <td>{{ employee.building || 'N/A' }}</td>
                    <td>{{ employee.title || 'N/A' }}</td>
                    <td>{{ employee.room || 'N/A' }}</td>
                    <td>
                      <a 
                        [routerLink]="['/employee/edit', employee.employeeId]" 
                        class="btn btn-sm btn-outline-primary me-2">
                        Edit
                      </a>
                      <button 
                        class="btn btn-sm btn-outline-danger"
                        (click)="deleteEmployee(employee.employeeId!)">
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- No Data Message -->
            <div *ngIf="!loading && employees.length === 0" class="text-center py-5">
              <h5 class="text-muted">No employees found</h5>
              <p class="text-muted">
                <a routerLink="/employee/create">Add the first employee</a> or 
                <a routerLink="/import">import from XML</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  searchTerm: string = '';
  message: string = '';
  errorMessage: string = '';
  loading: boolean = false;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadAllEmployees();
  }

  loadAllEmployees(): void {
    this.loading = true;
    this.employeeService.getAllEmployees().subscribe({
      next: (data) => {
        this.employees = data;
        this.loading = false;
        this.searchTerm = '';
      },
      error: (error) => {
        this.errorMessage = 'Error loading employees: ' + error.message;
        this.loading = false;
      }
    });
  }

  searchEmployees(): void {
    if (this.searchTerm.trim()) {
      this.loading = true;
      this.employeeService.searchEmployeesByName(this.searchTerm.trim()).subscribe({
        next: (data) => {
          this.employees = data;
          this.loading = false;
        },
        error: (error) => {
          this.errorMessage = 'Error searching employees: ' + error.message;
          this.loading = false;
        }
      });
    } else {
      this.loadAllEmployees();
    }
  }

  deleteEmployee(id: number): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => {
          this.message = 'Employee deleted successfully';
          this.loadAllEmployees();
        },
        error: (error) => {
          this.errorMessage = 'Error deleting employee: ' + error.message;
        }
      });
    }
  }
}