import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Constant } from '../shared/constants';
import { GlobalService } from './global.service';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private globalService: GlobalService) {}

  public getAll(): Observable<any> {
    return this.globalService.get(Constant.Endpoints.USER.ALL).pipe(
      map((res) => {
        return res;
      })
    );
  }

  public getById(id: any) {
    return this.globalService.get(Constant.Endpoints.USER.ALL + '/' + id).pipe(
      map((res) => {
        return res;
      })
    );
  }

  public createUser(user: User) {
    return this.globalService.post(Constant.Endpoints.USER.CREATE, user).pipe(
      map((res) => {
        return res;
      })
    );
  }
}
