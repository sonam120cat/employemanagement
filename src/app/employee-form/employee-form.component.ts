import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent {
  @Input() employee: Employee | null = null; // Receive employee data for editing
  @Output() close = new EventEmitter<void>(); // Emit event to close the modal
  @Output() save = new EventEmitter<Employee>(); // Emit event to save employee data

  // Temporary data storage for form inputs
  formData: Employee = {
    id:0,
    name: '',
    role: 'Software Developer',
    rating:0,
    experience:'',
    joiningDate:'',
    team:'',
    manager:'',
    location:'',
    email: '',
    phone: '',
    avatar: ''
  };

  ngOnInit(): void {
    if (this.employee) {
      this.formData = { ...this.employee }; // Pre-fill form for edit mode
    }
  }

  onSave(): void {
    this.save.emit(this.formData);
  }

  onClose(): void {
    this.close.emit();
  }
}
