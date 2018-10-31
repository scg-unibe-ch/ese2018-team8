import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {JoblistingComponent} from './joblisting/joblisting.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {CreatejoblistComponent} from './createjoblist/createjoblist.component';
import {JoblistdetailComponent} from './joblistdetail/joblistdetail.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './login/login.authguard';


const routes: Routes = [
  {path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  {path: 'createjoblist', component: CreatejoblistComponent},
  {path: 'joblistdetail', component: JoblistdetailComponent},
  {path: 'login', component: LoginComponent },

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
