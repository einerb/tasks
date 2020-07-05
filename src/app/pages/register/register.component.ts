import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { parse } from 'himalaya';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public form: FormGroup;
  public submitted = false;
  public loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      fullname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  public onRegister() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.userService.createUser(this.form.value).subscribe(
      () => {
        this.onSuccess();
      },
      (err) => {
        this.onFailure(err);
      }
    );
  }

  private onSuccess() {
    Swal.fire({
      icon: 'success',
      title: 'Enhorabuena!',
      text: 'Registro de usuario exitosamente.',
    });

    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 3000);
  }

  private onFailure = (res: HttpErrorResponse) => {
    this.loading = false;
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
}
