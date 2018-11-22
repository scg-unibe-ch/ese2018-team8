// Our modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule, MatCardModule, MatCheckboxModule, MatInputModule, MatListModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
// Our components
import { AppComponent} from './app.component';
import { AdminComponent} from './adminpage/admin.component';
import { JoblistingComponent } from './joblisting/joblisting.component';
import { SkillComponent } from './skill/skill.component';
import { AlertComponent} from './alert/alert.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreatejoblistComponent } from './createjoblist/createjoblist.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ViewjoblistingComponent} from './joblisting/viewjoblisting.component';
import { PageNotFoundComponent } from './alert/page-not-found.component';
import { CompanyJoblistComponent} from './company/company-joblist.component';
import { CompanyEditJobComponent} from './company/company-edit-job.component';
import { CompanyComponent} from './company/company.component';
// Our services
import { AuthenticationService } from './login/login.authservice';
import { AlertService } from './alert/alert.alertservice';
import { UserService } from './login/user.service';
import {AdminService} from './adminpage/admin.service';
// Our providers
import { httpInterceptorProviders } from './helpers/interceptors.index';
// Our guards
import {AuthGuard} from './login/login.authguard';
import {AdminGuard} from './adminpage/admin.guard';
import {UiModule} from './ui/ui.module';
import {LayoutComponent} from './ui/layout/layout.component';


@NgModule({
  declarations: [
    AppComponent,
    JoblistingComponent,
    SkillComponent,
    DashboardComponent,
    CreatejoblistComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    ViewjoblistingComponent,
    PageNotFoundComponent,
    CompanyComponent,
    CompanyJoblistComponent,
    CompanyEditJobComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    UiModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatListModule,
    MatInputModule,
    MatCheckboxModule,
    MatCardModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    httpInterceptorProviders,
    AuthGuard,
    UserService,
    AdminGuard,
    AuthenticationService,
    AdminService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
