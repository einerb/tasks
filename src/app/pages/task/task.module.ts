import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TaskRoutingModule } from './task-routing.module';
import { TaskComponent } from './task.component';
import { TaskModalComponent } from './task-modal/task-modal.component';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [
    TaskComponent,
    TaskModalComponent,
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    ComponentsModule
  ],
  entryComponents: [TaskModalComponent],
})
export class TaskModule {}
