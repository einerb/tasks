import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Constant } from '../shared/constants';
import { GlobalService } from './global.service';
import { Task } from '../interfaces/task.interface';
import { TaskUser } from '../interfaces/task.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private globalService: GlobalService) {}

  public getAll(): Observable<any> {
    return this.globalService.get(Constant.Endpoints.TASK.ALL).pipe(
      map((res) => {
        return res;
      })
    );
  }

  public getById(id: any) {
    return this.globalService.get(Constant.Endpoints.TASK.ALL + '/' + id).pipe(
      map((res) => {
        return res;
      })
    );
  }

  public createTask(id: any, task: TaskUser) {
    return this.globalService
      .post(Constant.Endpoints.TASK.CREATE + '/' + id, task)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public updateTask(task: Task) {
    return this.globalService
      .put(Constant.Endpoints.TASK.UPDATE + '/' + task._id, task)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public deleteTask(task: Task) {
    return this.globalService
      .delete(Constant.Endpoints.TASK.DELETE + '/' + task._id)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
}
