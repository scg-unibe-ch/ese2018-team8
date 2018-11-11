// Our modules
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatButtonModule, MatCardModule, MatCheckboxModule, MatInputModule, MatListModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {UiModule } from './ui/ui.module';
import {AppRoutingModule } from './app-routing.module';
import {ReactiveFormsModule } from '@angular/forms';

// Our components
import {AppComponent} from './app.component';
import { JoblistingComponent } from './joblisting/joblisting.component';
import { SkillComponent } from './skill/skill.component';
import { AlertComponent} from './alert/alert.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { JoblistdetailComponent } from './joblistdetail/joblistdetail.component';
import { CreatejoblistComponent } from './createjoblist/createjoblist.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin/admin.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';

// Our services
import {AuthenticationService} from './login/login.authservice';
import {AlertService} from './alert/alert.alertservice';

// Our Interceptors
import {JwtInterceptor} from './helpers/jwt.interceptor';
import {ErrorInterceptor} from './helpers/error.interceptor';

// Our guards
import {AuthGuard} from './login/login.authguard';
import { ViewJoblistingComponent } from './view-joblisting/view-joblisting.component';

@NgModule({
  declarations: [
    AppComponent,
    JoblistingComponent,
    SkillComponent,
    DashboardComponent,
    JoblistdetailComponent,
    CreatejoblistComponent,
    LoginComponent,
    AlertComponent,
    AdminComponent,
    AdminDashboardComponent,
    ViewJoblistingComponent
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
    UiModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
