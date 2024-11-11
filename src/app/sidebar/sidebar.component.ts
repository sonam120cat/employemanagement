import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { EmployeeService } from '../employee.service';
import { Employee } from '../models/employee.model';

interface NavItem {
  label: string;
  icon: string;
  route: string;
  active:boolean;
  notificationCount?: number;
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
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  animations: [
    trigger('panelAnimation', [
      state('closed', style({ transform: 'translateX(-100%)' })),
      state('open', style({ transform: 'translateX(0)' })),
      transition('closed <=> open', animate('300ms ease-in-out')),
    ]),
  ],
})
export class SidebarComponent  implements OnInit{
  isSearchPanelOpen: boolean = false;
  employees: Employee[] = [];
  navItems: NavItem[] = [
    { label: 'Overview', icon: 'overview-icon', route: '/employee' ,active:true},
    { label: 'Messages', icon: 'messages-icon', route: '/messages', notificationCount: 99,active:false },
    { label: 'Search', icon: 'search-icon', route: '/search' ,active:false},
    { label: 'Filter', icon: 'filter-icon', route: '/filter',active:false },
    { label: 'History', icon: 'history-icon', route: '/history' ,active:false},
    { label: 'My Account', icon: 'account-icon', route: '/account',active:false }
  ];

  footerItems: NavItem[] = [
    { label: 'Get Help', icon: 'help-icon', route: '/help',active:false},
    { label: 'Sign Out', icon: 'signout-icon', route: '/signout',active:false }
  ];



  constructor(private router: Router,private employeeService:EmployeeService){}

  ngOnInit(){
    this.getEmployees();
  }

  toggleSearchPanel() {
    this.isSearchPanelOpen = !this.isSearchPanelOpen;
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
  getEmployees(): void {
    this.employeeService.getEmployees().subscribe((employees: Employee[]) => {
      this.employees = employees;
    });
  }
  filteredContent: any[] = []; // Adjust this based on the actual content

filterContent(formData: FilterFormData) {
  this.filteredContent = this.employees.filter(item =>
    item.name.includes(formData.name) || item.email.includes(formData.email)
  );
  console.log(this.filteredContent);
}
}
