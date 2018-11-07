import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {JoblistingComponent} from './joblisting/joblisting.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {CreatejoblistComponent} from './createjoblist/createjoblist.component';
import {JoblistdetailComponent} from './joblistdetail/joblistdetail.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './login/login.authguard';
import {RegisterComponent} from './register/register.component';
import {AdminComponent} from './adminpage/admin.component';


const routes: Routes = [
  {path: 'joblisting', component: JoblistingComponent },
  {path: 'createjoblist', component: CreatejoblistComponent, canActivate: [AuthGuard]},
  {path: 'joblistdetail', component: JoblistdetailComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'login', component: LoginComponent },
  {path: 'register', component: RegisterComponent },
  {path: 'admin', component: AdminComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
