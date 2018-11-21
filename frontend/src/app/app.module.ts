// Our modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule, MatCardModule, MatCheckboxModule, MatInputModule, MatListModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './/app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
// Our components
import { AppComponent} from './app.component';
import { AdminVerifyComponent} from './adminpage/adminverify.component';
import { JoblistingComponent } from './joblisting/joblisting.component';
import { SkillComponent } from './skill/skill.component';
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
import {UiModule} from './ui/ui.module';
import {LayoutComponent} from './ui/layout/layout.component';
import {AdminService} from './adminpage/admin.service';
import {AdminAllComponent} from './adminpage/adminall.component';
import {UpdateJobComponent} from './adminpage/updatejob.component';



@NgModule({
  declarations: [
    AppComponent,
    JoblistingComponent,
    SkillComponent,
    DashboardComponent,
    JoblistdetailComponent,
    CreatejoblistComponent,
    LoginComponent,
    RegisterComponent,
    ViewjoblistingComponent,
    PageNotFoundComponent,
    AdminVerifyComponent,
    AdminAllComponent,
    UpdateJobComponent
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
    AuthenticationService,
    AdminService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
