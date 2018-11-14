// Our modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule, MatCardModule, MatCheckboxModule, MatInputModule, MatListModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { UiModule } from './ui/ui.module';
import { AppRoutingModule } from './/app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
// Our components
import { AppComponent} from './app.component';
import { AdminComponent} from './adminpage/admin.component';
import { JoblistingComponent } from './joblisting/joblisting.component';
import { SkillComponent } from './skill/skill.component';
import { AlertComponent} from './alert/alert.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { JoblistdetailComponent } from './joblistdetail/joblistdetail.component';
import { CreatejoblistComponent } from './createjoblist/createjoblist.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ViewjoblistingComponent } from './viewjoblisting/viewjoblisting.component';
import { PageNotFoundComponent } from './alert/page-not-found.component';
// Our services
import { AuthenticationService } from './login/login.authservice';
import { AlertService } from './alert/alert.alertservice';
import { UserService } from './login/user.service';

// Our providers
import { httpInterceptorProviders } from './helpers/interceptors.index';

// Our guards
import {AuthGuard} from './login/login.authguard';



@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    JoblistingComponent,
    SkillComponent,
    DashboardComponent,
    JoblistdetailComponent,
    CreatejoblistComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    ViewjoblistingComponent,
    PageNotFoundComponent,
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
    ReactiveFormsModule,
  ],
  providers: [
    httpInterceptorProviders,
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
