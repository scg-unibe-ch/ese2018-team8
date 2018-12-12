// Our modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LayoutComponent} from './layout/layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule, MatCardModule, MatCheckboxModule, MatInputModule, MatListModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule} from '@angular/common';
import { ModalModule } from 'ngb-modal';

// Our components
import { AppComponent} from './app.component';
import { AdminVerifyComponent} from './adminpage/adminverify.component';
import { JoblistingComponent } from './joblisting/joblisting.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreatejoblistComponent } from './createjoblist/createjoblist.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ViewjoblistingComponent} from './joblisting/viewjoblisting.component';
import { PageNotFoundComponent } from './alert/page-not-found.component';
import { CompanyJoblistComponent} from './company/company-joblist.component';
import { CompanyEditJobComponent} from './company/company-edit-job.component';
import { CompanyComponent} from './company/company.component';
import {AlertComponent} from './alert/alert.component';
// Our services
import { AuthenticationService } from './login/login.authservice';
import { AlertService } from './alert/alert.alertservice';
import { AdminService } from './adminpage/admin.service';

// Our providers
import { httpInterceptorProviders } from './helpers/interceptors.index';
// Our guards
import { AuthGuard } from './login/login.authguard';
// Admin Components
import { AdminAllComponent } from './adminpage/adminall.component';
import { CompanyEditComponent } from './company/company-edit.component';
import { ChangePasswordComponent } from './changePassword/change-password.component';




@NgModule({
  declarations: [
    AppComponent,
    JoblistingComponent,
    DashboardComponent,
    CreatejoblistComponent,
    LoginComponent,
    RegisterComponent,
    ViewjoblistingComponent,
    PageNotFoundComponent,
    AdminVerifyComponent,
    AdminAllComponent,
    CompanyComponent,
    CompanyEditComponent,
    CompanyJoblistComponent,
    CompanyEditJobComponent,
    LayoutComponent,
    AlertComponent,
    ChangePasswordComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatListModule,
    MatInputModule,
    MatCheckboxModule,
    MatCardModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    ModalModule
  ],
  providers: [
    httpInterceptorProviders,
    AuthGuard,
    AuthenticationService,
    AdminService,
    AlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
