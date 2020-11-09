import Swal from 'sweetalert2';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { parse } from 'himalaya';

import { GlobalService } from 'src/app/services/global.service';
import { User } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  public userDataCopy: User;
  public userId: any;
  public userForm: FormGroup;

  constructor(
    private globalService: GlobalService,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.userId = this.globalService.getDecodedToken();
    this.getById(this.userId.sub);
  }

  public onSave() {
    if (this.userForm.valid) {
      this.userService
        .updateUser(this.userId.sub, this.userForm.value)
        .subscribe(
          (res) => {
            this.userDataCopy = res.data;
            this.onSuccess();
          },
          (err) => this.onFailure(err)
        );
    }
  }

  private createForm() {
    this.userForm = this.formBuilder.group({
      fullname: ['', [Validators.required]],
      email: ['', [Validators.required]],
    });
  }

  private getById(id: string) {
    this.userService.getById(id).subscribe(
      (res) => {
        this.userDataCopy = res.data;
        this.patchValue(this.userDataCopy);
      },
      (err) => {
        this.onFailure(err);
      }
    );
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

  private patchValue(data: any) {
    this.userForm.patchValue({
      fullname: data.fullname,
      email: data.email,
    });
  }
}
