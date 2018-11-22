import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule} from '../app-routing.module';
import { AlertService } from '../alert/alert.alertservice';
import { AlertComponent } from '../alert/alert.component';
import { CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    AlertComponent
  ],
  imports: [
      AppRoutingModule,
      CommonModule
  ],
  exports: [
      LayoutComponent
  ],
  providers: [
      AlertService
  ]
})
export class UiModule { }
