import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../models/employee.model';


interface FilterFormData {
  name: string;
  email: string;
  department: string;
  experience: string;
  yearOfJoining: number;
  location: string;
  team: string;
}



@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})


export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  selectedEmployee: Employee | null = null;
  showModal: boolean = false;
  @Input() showOnlyBangalore = false;
  @Output() formData= new EventEmitter<FilterFormData>();
  allEmployees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  searchName: string = '';
  searchEmail: string = '';

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployees();
    this.employeeService.getEmployees().subscribe((employees: Employee[]) => {
      this.allEmployees = employees;
      this.filteredEmployees = employees; // Initially show all employees
    });
  }

  getEmployees(): void {
    this.employeeService.getEmployees().subscribe((employees: Employee[]) => {
      this.employees = employees;
    });
  }

  // Open modal to add a new employee
  onAdd(): void {
    this.selectedEmployee = null;
    this.showModal = true;
  }


  // Handle saving a new or edited employee
  onSave(employee: Employee): void {
    if (employee.id) {
      this.employeeService.updateEmployee(employee).subscribe(() => {
        this.getEmployees();
        this.showModal = false;
      });
    } else {
      this.employeeService.addEmployee(employee).subscribe(() => {
        this.getEmployees();
        this.showModal = false;
      });
    }
  }

  searchEmployee(): void {
    // Filter employees based on searchName and searchEmail
    this.filteredEmployees = this.allEmployees.filter(employee =>
      (this.searchName ? employee.name.toLowerCase().includes(this.searchName.toLowerCase()) : true) &&
      (this.searchEmail ? employee.email.toLowerCase().includes(this.searchEmail.toLowerCase()) : true)
    );
  }

  // Handle closing the modal without saving
  onClose(): void {
    this.showModal = false;
  }
}
