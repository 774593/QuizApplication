import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  template: `
    <form (ngSubmit)="login()">
      <input [(ngModel)]="userName" name="userName" placeholder="username" />
      <input [(ngModel)]="password" name="password" placeholder="password" type="password" />
      <button type="submit">Login</button>
    </form>
  `
})
export class LoginComponent {
  userName = '';
  password = '';

  constructor(private userService: UserService) {}

  login() {
    this.userService.login(this.userName, this.password).subscribe({
      next: user => {
        console.log('logged in', user);
      },
      error: err => {
        console.error('login error', err);
      }
    });
  }
}