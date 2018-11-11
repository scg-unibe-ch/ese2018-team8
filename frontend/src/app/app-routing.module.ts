import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ViewjoblistingComponent} from './viewjoblisting/viewjoblisting.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {CreatejoblistComponent} from './createjoblist/createjoblist.component';
import {JoblistdetailComponent} from './joblistdetail/joblistdetail.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './login/login.authguard';
import {RegisterComponent} from './register/register.component';
import {AdminComponent} from './adminpage/admin.component';


const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent },
  {path: 'viewjoblisting', component: ViewjoblistingComponent },
  {path: 'createjoblist', component: CreatejoblistComponent, canActivate: [AuthGuard]},
  {path: 'joblistdetail/:id', component: JoblistdetailComponent},
  {path: 'login', component: LoginComponent },
  {path: 'register', component: RegisterComponent },
  {path: 'admin', component: AdminComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
