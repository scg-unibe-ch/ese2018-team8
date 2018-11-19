import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ViewjoblistingComponent} from './joblisting/viewjoblisting/viewjoblisting.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {CreatejoblistComponent} from './createjoblist/createjoblist.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './login/login.authguard';
import {RegisterComponent} from './register/register.component';
import {AdminComponent} from './adminpage/admin.component';
import {PageNotFoundComponent} from './alert/page-not-found.component';
import {JoblistingComponent} from './joblisting/joblisting.component';
import {AdminGuard} from './adminpage/admin.guard';
import {UserService} from './login/user.service';
import { CompanyJoblistComponent} from './company/company-joblist.component';
import { CompanyEditJobComponent} from './company/company-edit-job.component';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent },
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'viewjoblisting', component: ViewjoblistingComponent },
  {path: 'createjoblist', component: CreatejoblistComponent, canActivate: [AuthGuard]},
  {path: 'joblisting/:id', component: JoblistingComponent},
  {path: 'login', component: LoginComponent },
  {path: 'register', component: RegisterComponent },
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
  {path: 'company-joblist', component: CompanyJoblistComponent},
  {path: 'company-edit-job', component: CompanyEditJobComponent},
  {path: '**', component: PageNotFoundComponent }

];

@NgModule({
  imports: [ RouterModule.forRoot(routes,
    { enableTracing: true })], // debugging purposes only
  exports: [RouterModule]
})
export class AppRoutingModule { }
