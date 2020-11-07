import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FooterComponent } from 'src/app/components/footer/footer.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';

@NgModule({
  declarations: [NavbarComponent, FooterComponent],
  imports: [CommonModule, NgxSpinnerModule, FormsModule, ReactiveFormsModule],
  exports: [
    NavbarComponent,
    FooterComponent,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ComponentsModule {}
