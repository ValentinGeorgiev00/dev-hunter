import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentications.service';
import { NotificationService } from 'src/app/services/notification.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  submit(): void {
    this.authService
      .login$(this.form.value.email, this.form.value.password)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          localStorage.setItem('token', res.accessToken);
          this.router.navigate(['/technologies']);
        },
        error: (res: HttpErrorResponse) => {
          if (
            res.error === 'Incorect password' ||
            res.error === 'Cannot find user'
          ) {
            this.notificationService.message('Incorect email or password.');
          } else {
            this.notificationService.message(res.error);
          }
        },
      });
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
}
