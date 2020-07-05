import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';

import { TaskRoutingModule } from './task-routing.module';
import { TaskComponent } from './task.component';
import { TaskModalComponent } from './task-modal/task-modal.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';

@NgModule({
  declarations: [
    TaskComponent,
    NavbarComponent,
    FooterComponent,
    TaskModalComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxSpinnerModule,
    TaskRoutingModule,
  ],
  entryComponents: [TaskModalComponent],
})
export class TaskModule {}
