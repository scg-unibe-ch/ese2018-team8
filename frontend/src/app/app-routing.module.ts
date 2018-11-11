import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {JoblistingComponent} from './joblisting/joblisting.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {CreatejoblistComponent} from './createjoblist/createjoblist.component';
import {JoblistdetailComponent} from './joblistdetail/joblistdetail.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './login/login.authguard';


const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent },
  {path: 'joblisting', component: JoblistingComponent },
  {path: 'createjoblist', component: CreatejoblistComponent, /*canActivate: [AuthGuard]*/},
  {path: 'joblistdetail/:id', component: JoblistdetailComponent},
  {path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
