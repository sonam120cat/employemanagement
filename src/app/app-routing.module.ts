import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { SearchComponent } from './search/search.component';


const routes: Routes = [
  { path: '', component: MainLayoutComponent },
  { path: 'employee', component: MainLayoutComponent },
  { path: '', redirectTo: '/employee', pathMatch: 'full' },
  { path: '**', redirectTo: '/employee' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
