import { Component, Input, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../models/employee.model';

// interface Employee {
//   id:number,
//   name: string;
//   role: string;
//   rating: number;
//   experience: string;
//   joiningDate: string;
//   team: string;
//   manager: string;
//   phone: string;
//   email: string;
// }

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.css']
})
export class EmployeeCardComponent implements OnInit{
  @Input() employee!: Employee;

  employees: Employee[] = [];
  selectedEmployee: Employee | null = null;
  showModal: boolean = false;

  constructor(private employeeService:EmployeeService ){}
  ngOnInit(){
    this.getEmployees();
  }

  getStarsArray(): boolean[] {
    // Generates an array where 'true' represents a filled star and 'false' represents an empty star
    const stars = Array(5).fill(false);
    for (let i = 0; i < Math.floor(this.employee.rating); i++) {
      stars[i] = true;
    }
    return stars;
  }

  // Open modal to edit an existing employee
  onEdit(employee: Employee): void {
    this.selectedEmployee = employee;
    this.showModal = true;
  }

  getEmployees(): void {
    this.employeeService.getEmployees().subscribe((employees: Employee[]) => {
      this.employees = employees;
    });
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

  // Handle closing the modal without saving
  onClose(): void {
    this.showModal = false;
  }

  onDelete(employee: Employee): void {
    if (confirm(`Are you sure you want to delete ${employee.name}?`)) {
      this.employeeService.deleteEmployee(employee.id).subscribe(() => {
        this.getEmployees();
      });
    }
  }
}
