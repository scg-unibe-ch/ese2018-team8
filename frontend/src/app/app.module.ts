import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

// Add css components from angular material
import {MatButtonModule, MatCardModule, MatCheckboxModule, MatInputModule, MatListModule} from '@angular/material';
import { JoblistingComponent } from './joblisting/joblisting.component';
import { SkillComponent } from './skill/skill.component';
import {FormsModule} from '@angular/forms';
import { UiModule } from './ui/ui.module';
import { AppRoutingModule } from './/app-routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { JoblistdetailComponent } from './joblistdetail/joblistdetail.component';
import { CreatejoblistComponent } from './createjoblist/createjoblist.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import {AlertComponent} from './alert/alert.component';
import {AuthenticationService} from './login/login.authservice';
import {AuthGuard} from './login/login.authguard';
import {AlertService} from './alert/alert.alertservice';
import {JwtInterceptor} from './helpers/jwt.interceptor';
import {ErrorInterceptor} from './helpers/error.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    JoblistingComponent,
    SkillComponent,
    DashboardComponent,
    JoblistdetailComponent,
    CreatejoblistComponent,
    LoginComponent,
    AlertComponent
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
