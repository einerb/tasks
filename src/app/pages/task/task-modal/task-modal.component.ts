import Swal from 'sweetalert2';
import {
  Component,
  OnInit,
  ViewChild,
  Input,
} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { parse } from 'himalaya';

import { TaskUser } from 'src/app/interfaces/task.interface';
import { TaskService } from 'src/app/services/task.service';
import { User } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.css'],
})
export class TaskModalComponent implements OnInit {
  @ViewChild('editTaskForm', { static: false }) editTaskForm: NgForm;
  @Input() editingMode: boolean;
  @Input() taskData: TaskUser;
  @Input() userInfo: User;
  @Input() title: string;

  public taskDataCopy: TaskUser;

  private noDataChange = () => this.editTaskForm.pristine;

  constructor(
    public editTaskModal: NgbActiveModal,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.taskDataCopy = new TaskUser(this.editingMode ? this.taskData : null);
  }

  public onSave() {
    if (this.editTaskForm.valid) {
      if (this.editingMode) {
        this.taskService.updateTask(this.taskDataCopy).subscribe(
          () => {
            this.onSuccess();
            this.editTaskModal.close('success');
          },
          (err) => this.onFailure(err)
        );
      } else {
        this.taskService
          .createTask(this.userInfo.id, this.taskDataCopy)
          .subscribe(
            () => {
              this.onSuccess();
              this.editTaskModal.close('success');
            },
            (err) => this.onFailure(err)
          );
      }
    } else {
    }
  }

  public undoChanges() {
    this.taskDataCopy = new TaskUser(this.taskData);
  }

  private onFailure = (res: HttpErrorResponse) => {
    const json = parse(res.error);
    const err = json[2].children[3].children[1].children[0].content;

    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: err,
      footer:
        'Si el problema persiste, por favor comuníqueselo al administrador de la plataforma.',
    });
  };

  private onSuccess() {
    Swal.fire('Enhorabuena!', 'Registro guardado exitosamente.', 'success');
  }
}
