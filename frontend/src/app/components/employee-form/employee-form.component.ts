import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">
            <h4>{{ isEditMode ? 'Edit Employee' : 'Add New Employee' }}</h4>
          </div>
          <div class="card-body">
            <!-- Alert Messages -->
            <div *ngIf="message" class="alert alert-success alert-dismissible fade show">
              {{ message }}
              <button type="button" class="btn-close" (click)="message = ''"></button>
            </div>

            <div *ngIf="errorMessage" class="alert alert-danger alert-dismissible fade show">
              {{ errorMessage }}
              <button type="button" class="btn-close" (click)="errorMessage = ''"></button>
            </div>

            <!-- Employee Form -->
            <form (ngSubmit)="saveEmployee()" #employeeForm="ngForm">
              <div class="row">
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="firstName" class="form-label">First Name *</label>
                    <input 
                      type="text" 
                      class="form-control" 
                      id="firstName"
                      name="firstName"
                      [(ngModel)]="employee.firstName"
                      required
                      maxlength="50"
                      #firstName="ngModel">
                    <div *ngIf="firstName.invalid && firstName.touched" class="invalid-feedback d-block">
                      First name is required (max 50 characters)
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="lastName" class="form-label">Last Name *</label>
                    <input 
                      type="text" 
                      class="form-control" 
                      id="lastName"
                      name="lastName"
                      [(ngModel)]="employee.lastName"
                      required
                      maxlength="50"
                      #lastName="ngModel">
                    <div *ngIf="lastName.invalid && lastName.touched" class="invalid-feedback d-block">
                      Last name is required (max 50 characters)
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="division" class="form-label">Division</label>
                    <input 
                      type="text" 
                      class="form-control" 
                      id="division"
                      name="division"
                      [(ngModel)]="employee.division"
                      maxlength="100">
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="building" class="form-label">Building</label>
                    <input 
                      type="text" 
                      class="form-control" 
                      id="building"
                      name="building"
                      [(ngModel)]="employee.building"
                      maxlength="100">
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="title" class="form-label">Title</label>
                    <input 
                      type="text" 
                      class="form-control" 
                      id="title"
                      name="title"
                      [(ngModel)]="employee.title"
                      maxlength="100">
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="room" class="form-label">Room</label>
                    <input 
                      type="text" 
                      class="form-control" 
                      id="room"
                      name="room"
                      [(ngModel)]="employee.room"
                      maxlength="20">
                  </div>
                </div>
              </div>

              <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <a routerLink="/employees" class="btn btn-secondary me-md-2">Cancel</a>
                <button 
                  type="submit" 
                  class="btn btn-primary"
                  [disabled]="employeeForm.invalid || loading">
                  <span *ngIf="loading" class="spinner-border spinner-border-sm me-2"></span>
                  {{ isEditMode ? 'Update' : 'Create' }} Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `
})
export class EmployeeFormComponent implements OnInit {
  employee: Employee = {
    firstName: '',
    lastName: '',
    division: '',
    building: '',
    title: '',
    room: ''
  };
  isEditMode: boolean = false;
  employeeId: number | null = null;
  message: string = '';
  errorMessage: string = '';
  loading: boolean = false;

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.employeeId = +id;
      this.isEditMode = true;
      this.loadEmployee();
    }
  }

  loadEmployee(): void {
    if (this.employeeId) {
      this.loading = true;
      this.employeeService.getEmployeeById(this.employeeId).subscribe({
        next: (data) => {
          this.employee = data;
          this.loading = false;
        },
        error: (error) => {
          this.errorMessage = 'Error loading employee: ' + error.message;
          this.loading = false;
        }
      });
    }
  }

  saveEmployee(): void {
    this.loading = true;
    this.message = '';
    this.errorMessage = '';

    if (this.isEditMode && this.employeeId) {
      this.employeeService.updateEmployee(this.employeeId, this.employee).subscribe({
        next: (data) => {
          this.loading = false;
          this.message = 'Employee updated successfully';
          setTimeout(() => {
            this.router.navigate(['/employees']);
          }, 2000);
        },
        error: (error) => {
          this.errorMessage = 'Error updating employee: ' + error.message;
          this.loading = false;
        }
      });
    } else {
      this.employeeService.createEmployee(this.employee).subscribe({
        next: (data) => {
          this.loading = false;
          this.message = 'Employee created successfully';
          setTimeout(() => {
            this.router.navigate(['/employees']);
          }, 2000);
        },
        error: (error) => {
          this.errorMessage = 'Error creating employee: ' + error.message;
          this.loading = false;
        }
      });
    }
  }
}