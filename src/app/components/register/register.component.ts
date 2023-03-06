import { AuthGuardGuard } from './../../guards/auth-guard.guard';
import { Routes, Router } from '@angular/router';
import { AuthenticationService } from './../../services/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  hide = true;
  load = true;
  error = false;
  public form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authSvc: AuthenticationService,
    private router: Router,
    private guard: AuthGuardGuard
  ) {
    this.form = this.fb.group({
      user: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {}
  register() {
    const body = {
      userName: this.form.value.user,
      password: this.form.value.password,
    };
    this.authSvc.register(body).subscribe({
      next: (res) => {
        if (res.success === true) {
          this.guard.token = res.token;
          this.authSvc.username = res.username;
          this.router.navigateByUrl('/main');
        } else {
          this.error = true;
        }
      },
      error: (error) => {
        console.log(error);
        this.error = true;
      },
    });
  }
}
