import { ConversationsService } from './../../services/conversations.service';
import { AuthGuardGuard } from './../../guards/auth-guard.guard';
import { Router } from '@angular/router';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide: boolean = true;
  public form!: FormGroup;
  public load: boolean = true;
  error: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authSvc: AuthenticationService,
    private router: Router,
    private guard: AuthGuardGuard,
    private ConversationsService: ConversationsService
  ) {
    this.form = this.fb.group({
      user: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {}
  getChats(arreglo: Array<string>, username: string): Array<string> {
    arreglo = arreglo.filter(function (i: any) {
      return i.userName.toString() !== username;
    });
    return arreglo;
  }

  login() {
    const body = {
      userName: this.form.value.user,
      password: this.form.value.password,
    };
    this.authSvc.login(body).subscribe({
      next: (res) => {
        if (res.success === true) {
          this.guard.token = res.token;
          this.authSvc.username = res.username;
          let chats = this.getChats(res.users, res.username);
          this.ConversationsService.chats = chats;
          this.router.navigateByUrl('/main');
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
