import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

import { Task } from '../../interfaces/task.interface';

import { TaskService } from 'src/app/services/task.service';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/interfaces/user.interface';
import { TaskModalComponent } from './task-modal/task-modal.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  public count = 0;
  public taskData: Task[] = [];
  public userInfo: User;

  constructor(
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private taskService: TaskService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.allTasks();
  }

  private allTasks() {
    this.userService.getById('5fa5e3c54888692ce452bfde').subscribe((res) => {
      this.taskData = res.data.tasks;
      this.userInfo = res.data;

      this.spinner.hide();
    });
  }

  public deleteTask(id: any) {
    Swal.fire({
      title: 'Está seguro?',
      text: 'Sí elimina no podrá recuperar!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, deseo eliminar!',
    }).then((result) => {
      if (result.value) {
        this.taskService.deleteTask(id).subscribe(() => {
          Swal.fire(
            'Eliminado!',
            'La tarea fue eliminado exitosamente.',
            'success'
          );
          this.allTasks();
        });
      }
    });
  }

  public openTaskModal(editingMode: boolean, task?: string) {
    const modalRef = this.modalService.open(TaskModalComponent, {
      windowClass: 'large-modal',
    });

    modalRef.componentInstance.editingMode = editingMode;
    modalRef.componentInstance.userInfo = this.userInfo;
    modalRef.componentInstance.title = editingMode
      ? 'Editar tarea'
      : 'Crear tarea';
    modalRef.componentInstance.taskData = editingMode ? task : null;

    modalRef.result.then((result) => {
      if (result == 'success') {
        this.allTasks();
      }
    });
  }
}
