import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';


// Add css components from angular material
import { MatButtonModule, MatCardModule, MatCheckboxModule, MatInputModule, MatListModule } from '@angular/material';
import { JoblistingComponent } from './joblisting/joblisting.component';
import { SkillComponent } from './skill/skill.component';
import { FormsModule} from '@angular/forms';
import { UiModule } from './ui/ui.module';
import { AppRoutingModule } from './/app-routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { JoblistdetailComponent } from './joblistdetail/joblistdetail.component';
import { CreatejoblistComponent } from './createjoblist/createjoblist.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from './login/login.authservice';
import { AuthGuard } from './login/login.authguard';
import { AlertComponent } from './alert/alert.component';
import { AlertService } from './alert/alert.alertservice';
import { RegisterComponent } from './register/register.component';
import { UserService } from './login/user.service';
import { httpInterceptorProviders } from './helpers/interceptors.index';
import { AdminComponent } from './adminpage/admin.component';


@NgModule({
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
    AdminComponent
  ],
  providers: [
    httpInterceptorProviders,
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
