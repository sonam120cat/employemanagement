import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from './models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employees: Employee[] = [];
  private employeeIdCounter = 1; // To generate unique IDs

  private employeesSubject: BehaviorSubject<Employee[]> = new BehaviorSubject<Employee[]>(this.employees);

  constructor() {
    // Initialize with sample data
    this.employees = [
      {
        id:1,
        name: 'Andrew Bridgen',
        role: 'Sr. UI Developer',
        rating: 3.5,
        experience: '5.8 Years',
        joiningDate: '2017',
        team: 'OCBC Singapore',
        manager: 'Lalit Agarwal',
        location: 'Bangalore',
        phone: '7406559241',
        email: 'andrew@infrrd.ai',
        avatar: 'assets/avatars/avatar1.png'
      },
      {
        id:2,
        name: 'Andrew Joseph',
        role: 'Manager',
        rating: 4,
        experience: '5.8 Years',
        joiningDate: '2017',
        team: 'OCBC Singapore',
        manager: 'Lalit Agarwal',
        location: 'Bangalore',
        phone: '7406559241',
        email: 'andrewjoseph@infrrd.ai',
        avatar: 'assets/avatars/avatar1.png'
      },
      {
        id:3,
        name: 'Andrew Bridgen',
        role: 'Sr. UI Developer',
        rating: 3.5,
        experience: '5.8 Years',
        joiningDate: '2017',
        team: 'OCBC Singapore',
        manager: 'Lalit Agarwal',
        location: 'Bangalore',
        phone: '7406559241',
        email: 'andrew@infrrd.ai',
        avatar: 'assets/avatars/avatar1.png'
      },
      {
        id:4,
        name: 'Andrew Bridgen',
        role: 'Sr. UI Developer',
        rating: 3.5,
        experience: '5.8 Years',
        joiningDate: '2017',
        team: 'OCBC Singapore',
        manager: 'Lalit Agarwal',
        location: 'Bangalore',
        phone: '7406559241',
        email: 'andrew@infrrd.ai',
        avatar: 'assets/avatars/avatar1.png'
      },
      {
        id:5,
        name: 'Andrew Bridgen',
        role: 'Sr. UI Developer',
        rating: 3.5,
        experience: '5.8 Years',
        joiningDate: '2017',
        team: 'OCBC Singapore',
        manager: 'Lalit Agarwal',
        location: 'Bangalore',
        phone: '7406559241',
        email: 'andrew@infrrd.ai',
        avatar: 'assets/avatars/avatar1.png'
      }
    ];
    this.employeesSubject.next(this.employees);
  }

  // Get all employees as an Observable
  getEmployees(): Observable<Employee[]> {
    return this.employeesSubject.asObservable();
  }

  // Add a new employee
  addEmployee(employee: Omit<Employee, 'id'>): Observable<Employee> {
    return new Observable(subscriber => {
      const newEmployee: Employee = { ...employee, id: this.employeeIdCounter++ };
      this.employees.push(newEmployee);
      this.employeesSubject.next([...this.employees]);
      subscriber.next(newEmployee);
      subscriber.complete();
    });
  }

  // Update an existing employee
  updateEmployee(updatedEmployee: Employee): Observable<Employee> {
    return new Observable(subscriber => {
      // Ensure id is a number for comparison
      const employeeId = typeof updatedEmployee.id === 'string'
        ? parseInt(updatedEmployee.id, 10)
        : updatedEmployee.id;

      // Debug log
      console.log('Updating employee with ID:', employeeId);
      console.log('Current employees:', this.employees);

      const index = this.employees.findIndex(emp => {
        const currentId = typeof emp.id === 'string' ? parseInt(emp.id, 10) : emp.id;
        return currentId === employeeId;
      });

      console.log('Found index:', index);

      if (index !== -1) {
        // Create a new employee object with the existing ID
        const updatedEmployeeWithId = {
          ...updatedEmployee,
          id: this.employees[index].id // Preserve the original ID
        };

        // Update the array
        this.employees[index] = updatedEmployeeWithId;

        // Create a new array reference to trigger change detection
        this.employeesSubject.next([...this.employees]);

        console.log('Updated employees:', this.employees);

        subscriber.next(updatedEmployeeWithId);
        subscriber.complete();
      } else {
        console.error('Employee not found with ID:', employeeId);
        subscriber.error(new Error(`Employee not found with ID: ${employeeId}`));
      }
    });
  }


  // Delete an employee by ID
  deleteEmployee(id: number): Observable<void> {
    return new Observable(subscriber => {
      const initialLength = this.employees.length;
      this.employees = this.employees.filter(emp => emp.id !== id);

      if (this.employees.length === initialLength) {
        subscriber.error(new Error('Employee not found'));
      } else {
        this.employeesSubject.next([...this.employees]);
        subscriber.next();
        subscriber.complete();
      }
    });
  }


  // Get an employee by ID
  getEmployeeById(id: number): Employee | undefined {
    return this.employees.find(emp => emp.id === id);
  }
}
