import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule} from '../app-routing.module';
@NgModule({
  imports: [
      AppRoutingModule
  ],
  declarations: [
      LayoutComponent,
      HeaderComponent,
      FooterComponent
  ],
  exports: [
      LayoutComponent
  ],
})
export class UiModule { }
