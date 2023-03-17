import { ConversationsService } from './../../services/conversations.service';
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
  hide:boolean = true;
  load:boolean = true;
  error:boolean = false;
  public form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authSvc: AuthenticationService,
    private router: Router,
  ) {
    this.form = this.fb.group({
      user: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {}
  register():void {
    const body = {
      userName: this.form.value.user,
      password: this.form.value.password,
      perfilImg:
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Far%2Fsearch%3Fk%3Ddefault%2520profile&psig=AOvVaw3JBzqfs26tb-ZShXm7fbhA&ust=1678236361611000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCOCb-OPLyP0CFQAAAAAdAAAAABAR',
    };
    this.authSvc.register(body).subscribe({
      next: (res) => {
        if (res.success === true) {
          this.router.navigateByUrl('/login');
        } else {
          this.error = true;
        }
      },
      error: (error) => {
        this.error = true;
      },
    });
  }
}
