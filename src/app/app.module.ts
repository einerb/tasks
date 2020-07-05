import localesCo from '@angular/common/locales/es-CO';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, LOCALE_ID, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { registerLocaleData, CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';

import localeEsCo from '@angular/common/locales/es-CO';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './services/guards/auth.guard';
import { InterceptRequestsService } from './services/intercepts/intercept-requets.service';

registerLocaleData(localeEsCo, 'es-Co');

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
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
