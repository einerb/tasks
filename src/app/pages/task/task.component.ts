import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

import { Task } from '../../interfaces/task.interface';
import { TaskModalComponent } from '../task/task-modal/task-modal.component';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  public count = 0;
  public taskData: Task[];
  public editingMode: boolean;
  public selected: Task;
  public selectedRow: number;
  public taskToEdit: Task;
  public visible = false;
  public user: any;

  constructor(
    private userService: UserService,
    private taskService: TaskService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.spinner.show();
    this.allTasks();
  }

  private allTasks() {
    this.userService.getById(this.user.id).subscribe((res) => {
      this.taskData = res.data.tasks;

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

  public onSelect = (task: Task) => {
    this.selected = task;
    this.editTask();
  };

  public setClickedRow = (index: number) => {
    this.selectedRow = index;
  };

  public addTask() {
    this.editingMode = false;
    this.openEditTaskModal();
  }

  public editTask() {
    this.editingMode = true;
    this.openEditTaskModal();
  }

  public openEditTaskModal() {
    const modalRef = this.modalService.open(TaskModalComponent, {
      windowClass: 'large-modal',
    });

    modalRef.componentInstance.editMode = this.editingMode;
    modalRef.componentInstance.title = this.editingMode
      ? 'Editar tarea'
      : 'Crear tarea';
    modalRef.componentInstance.taskData = this.editingMode
      ? this.selected
      : null;
  }
}
