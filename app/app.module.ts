import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';

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


@NgModule({
  declarations: [
    AppComponent,
    JoblistingComponent,
    SkillComponent,
    DashboardComponent,
    JoblistdetailComponent,
    CreatejoblistComponent,
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
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
