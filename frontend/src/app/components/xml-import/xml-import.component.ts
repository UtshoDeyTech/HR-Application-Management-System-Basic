import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-xml-import',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">
            <h4>Import Employee Data from XML</h4>
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

            <!-- Instructions -->
            <div class="alert alert-info">
              <h6>Instructions:</h6>
              <ul class="mb-0">
                <li>Select an XML file containing employee data</li>
                <li>The XML should follow the format: &lt;employees&gt;&lt;employee&gt;...&lt;/employee&gt;&lt;/employees&gt;</li>
                <li>Required fields: firstName, lastName</li>
                <li>Optional fields: division, building, title, room</li>
              </ul>
            </div>

            <!-- File Upload Section -->
            <div class="mb-4">
              <label for="xmlFile" class="form-label">Choose XML File</label>
              <input 
                type="file" 
                class="form-control" 
                id="xmlFile"
                accept=".xml"
                (change)="onFileSelected($event)"
                #fileInput>
            </div>

            <!-- Selected File Info -->
            <div *ngIf="selectedFile" class="mb-3">
              <div class="alert alert-light">
                <strong>Selected File:</strong> {{ selectedFile.name }}<br>
                <strong>Size:</strong> {{ (selectedFile.size / 1024).toFixed(2) }} KB<br>
                <strong>Type:</strong> {{ selectedFile.type }}
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
              <a routerLink="/employees" class="btn btn-secondary me-md-2">Back to Employees</a>
              <button 
                type="button" 
                class="btn btn-primary"
                (click)="importXmlData()"
                [disabled]="!selectedFile || loading">
                <span *ngIf="loading" class="spinner-border spinner-border-sm me-2"></span>
                Import XML Data
              </button>
            </div>

            <!-- Sample XML Format -->
            <div class="mt-4">
              <h6>Sample XML Format:</h6>
              <pre class="bg-light p-3 rounded"><code>&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;employees&gt;
  &lt;employee&gt;
    &lt;firstName&gt;John&lt;/firstName&gt;
    &lt;lastName&gt;Doe&lt;/lastName&gt;
    &lt;division&gt;IT&lt;/division&gt;
    &lt;building&gt;Building A&lt;/building&gt;
    &lt;title&gt;Software Engineer&lt;/title&gt;
    &lt;room&gt;101&lt;/room&gt;
  &lt;/employee&gt;
  &lt;employee&gt;
    &lt;firstName&gt;Jane&lt;/firstName&gt;
    &lt;lastName&gt;Smith&lt;/lastName&gt;
    &lt;division&gt;HR&lt;/division&gt;
    &lt;building&gt;Building B&lt;/building&gt;
    &lt;title&gt;HR Manager&lt;/title&gt;
    &lt;room&gt;201&lt;/room&gt;
  &lt;/employee&gt;
&lt;/employees&gt;</code></pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class XmlImportComponent {
  selectedFile: File | null = null;
  message: string = '';
  errorMessage: string = '';
  loading: boolean = false;

  constructor(private employeeService: EmployeeService) {}

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      if (file.type === 'text/xml' || file.name.toLowerCase().endsWith('.xml')) {
        this.selectedFile = file;
        this.errorMessage = '';
      } else {
        this.errorMessage = 'Please select a valid XML file';
        this.selectedFile = null;
        event.target.value = '';
      }
    }
  }

  importXmlData(): void {
    if (!this.selectedFile) {
      this.errorMessage = 'Please select a file first';
      return;
    }

    this.loading = true;
    this.message = '';
    this.errorMessage = '';

    this.employeeService.importXmlData(this.selectedFile).subscribe({
      next: (response) => {
        this.loading = false;
        this.message = response;
        this.selectedFile = null;
        // Reset file input
        const fileInput = document.getElementById('xmlFile') as HTMLInputElement;
        if (fileInput) {
          fileInput.value = '';
        }
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = 'Error importing XML: ' + error.error || error.message;
      }
    });
  }
}