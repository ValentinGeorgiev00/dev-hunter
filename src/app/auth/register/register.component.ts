import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentications.service';
import { NotificationService } from 'src/app/services/notification.service';
import { take } from 'rxjs/operators';
import { RegisterValidations } from 'src/app/validatiors/register-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.form = this.formBuilder.group(
      {
        username: [
          '',
          [
            Validators.required,
            Validators.maxLength(20),
            Validators.minLength(6),
          ],
        ],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
      },
      {
        validators: [
          RegisterValidations.mustMatch('password', 'confirmPassword'),
        ],
      }
    );
  }


  registerErrorMessages(): void {
    if (this.form.controls.username.errors) {
      this.notificationService.message('Username must be more than 6 characters');
    } else if (this.form.controls.password.errors) {
      this.notificationService.message('Password must be more than 6 characters');
    } else if (this.form.errors?.mustMatch) {
      this.notificationService.message('The passwords must be the same');
    } else {
      const { email, password, username } = this.form.value;
      this.authService
        .register$(email, password, username)
        .pipe(take(1))
        .subscribe({
          next: (res: any) => {
            localStorage.setItem('token', res.accessToken);
            this.router.navigate(['']);
          },
          error: (res: HttpErrorResponse) => {
            this.notificationService.message(res.error);
          },
        });
    }
  }

  submit(): void {
    this.registerErrorMessages();
  }
}
