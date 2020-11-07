import localeEsCo from '@angular/common/locales/es-CO';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, LOCALE_ID, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { registerLocaleData, CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './services/guards/auth.guard';
import { ComponentsModule } from './components/components.module';
import { InterceptRequestsService } from './services/intercepts/intercept-requets.service';

registerLocaleData(localeEsCo, 'es-Co');

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    FormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    NgbActiveModal,
    AuthGuard,
    InterceptRequestsService,
    { provide: LOCALE_ID, useValue: 'es-Co' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptRequestsService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
