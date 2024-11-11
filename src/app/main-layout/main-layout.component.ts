import { Component } from '@angular/core';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../employee.service';

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
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent {
  teams = ['Product Team', 'IDC', 'OCBC','Radian', 'Rustify'];
  selectedTeam = this.teams[0];
  showOnlyBangalore = false;
  searchName: string = '';
  searchEmail: string = '';
  allEmployees: Employee[] = [];
  filteredEmployees: Employee[] = [];

  constructor(private employeeService: EmployeeService){}


  ngOnInit(){
      this.employeeService.getEmployees().subscribe((employees: Employee[]) => {
        this.allEmployees = employees;
        this.filteredEmployees = employees; // Initially show all employees
      });
  }

  searchEmployee(): void {

    this.filteredEmployees = this.allEmployees.filter(employee =>
      (this.searchName ? employee.name.toLowerCase().includes(this.searchName.toLowerCase()) : true) &&
      (this.searchEmail ? employee.email.toLowerCase().includes(this.searchEmail.toLowerCase()) : true)
    );
  }
  onTeamChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedTeam = selectElement.value;
  }

}
