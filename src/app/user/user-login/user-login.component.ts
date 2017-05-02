import { Component } from '@angular/core';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'app-user-login',
  template: `
  <div> {{ (af.auth | async)?.uid }} </div>
  <button (click)="login()">Login</button>
  <button (click)="logout()">Logout</button>
  `,
})
export class UserLoginComponent {
  constructor(public af: AngularFire) {}

  login() {
    this.af.auth.login();
  }

  logout() {
     this.af.auth.logout();
  }
}
