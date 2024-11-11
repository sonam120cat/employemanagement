import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../models/employee.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface SearchResult {
  name: string;
  role: string;
  experience: number;
  dateOfJoining: number;
  currentTeam: string;
  reportingManager: string;
  phone: string;
  email: string;
}

interface FilterFormData {
  name: string;
  email: string;
  department: string;
  experience: string;
  yearOfJoining: number;
  location: string;
  team: string;
}

interface filterData{
  name:string,
  email:string
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent  implements OnInit{
  filterForm!: FormGroup;
  @Output() formSubmit = new EventEmitter<FilterFormData>();

  departments: string[] = [
    'Front End Development',
    'ML Engineering',
    'Quality Analyst',
    'Human Resource Management',
    'Research & Development'
  ];
  experiences: string[] = ['5 Years above'];
  yearsOfJoining: number[] = [2018];
  locations: string[] = ['Bangalore'];
  teams: string[] = ['OCBC Singapore', 'IDC', 'Radian', 'Rustify'];

  constructor(private fb: FormBuilder) {
    this.initForm();
  }

  private initForm(): void {
    this.filterForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      department: [''],
      experience: [''],
      yearOfJoining: [''],
      location: [''],
      team: ['']
    });
  }

  ngOnInit(): void {}

  filterResults(): void {
    if (this.filterForm.valid) {
      // Get form values directly as FilterFormData
      const formData: FilterFormData = this.filterForm.value as FilterFormData;

      // Emit the form data
      this.formSubmit.emit(formData);
      console.log('Form submitted:', formData);
    } else {
      this.markFormGroupTouched(this.filterForm);
    }
  }

  clearFilters(): void {
    this.filterForm.reset();
  }

  // Helper method to mark all controls as touched
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
