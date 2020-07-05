import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';
import { first, delay } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public loading = false;
  public passMinLegth = 5;
  public submitted = false;
  public user;
  hoy = new Date();

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  public onLoginEmailPassword() {
    localStorage.removeItem('user');

    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService
      .login(this.form.value)
      .pipe(first())
      .pipe(delay(1000))
      .subscribe(
        () => {
          this.onSuccess();
        },
        (err) => {
          this.onFailure(err);
        }
      );
  }

  public onSuccess() {
    this.router.navigateByUrl('/home');
  }

  public onFailure(err) {
    this.loading = false;

    Swal.fire({
      icon: 'error',
      title: 'Error de sesión',
      text: 'El usuario o la contraseña son incorrectas!',
    });
  }
}
