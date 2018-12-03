import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ViewjoblistingComponent} from './joblisting/viewjoblisting.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {CreatejoblistComponent} from './createjoblist/createjoblist.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AdminVerifyComponent} from './adminpage/adminverify.component';
import {PageNotFoundComponent} from './alert/page-not-found.component';
import {JoblistingComponent} from './joblisting/joblisting.component';
import {AdminAllComponent} from './adminpage/adminall.component';
import { CompanyJoblistComponent} from './company/company-joblist.component';
import { CompanyEditJobComponent} from './company/company-edit-job.component';
import {CompanyComponent} from './company/company.component';
import {AuthGuard} from './login/login.authguard';
import {UpdateUserComponent} from './adminpage/updateuser.component';
import {CompanyEditComponent} from './company/company-edit.component';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent },
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'viewjoblisting', component: ViewjoblistingComponent },
  {path: 'createjoblist', component: CreatejoblistComponent, canActivate: [AuthGuard] },
  {path: 'joblisting/:id', component: JoblistingComponent},
  {path: 'login', component: LoginComponent },
  {path: 'register', component: RegisterComponent },
  {path: 'adminverify', component: AdminVerifyComponent },
  {path: 'adminall', component: AdminAllComponent},
  {path: 'updateuser/:id', component: UpdateUserComponent},
  {path: 'company-joblist', component: CompanyJoblistComponent},
  {path: 'company-edit', component: CompanyEditComponent, canActivate: [AuthGuard] },
  {path: 'company-edit-job/:id', component: CompanyEditJobComponent},
  {path: 'company.component', component: CompanyComponent},
  {path: '**', component: PageNotFoundComponent }

];

@NgModule({
  imports: [ RouterModule.forRoot(routes,
    { enableTracing: true })], // debugging purposes only
  exports: [RouterModule]
})
export class AppRoutingModule { }
