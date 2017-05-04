import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  user = {};
  error: any;
  email: string;
  password: string;

  constructor(
    public af: AngularFire,
    private router: Router,
  ) {
    this.af.auth.subscribe(auth => {
      if(auth) {
        this.router.navigate(['/dashboard']);
        // user logged in
        //this.user = user;
      }
      else {
        // user not logged in
        //this.user = {};
      }
    });
  }

  loginWithEmail(formData) {
    if(formData.valid) {
      console.log(formData.value);
      this.af.auth.login({
        email: formData.value.email,
        password: formData.value.password
      },
      {
        provider: AuthProviders.Password,
        method: AuthMethods.Password,
      }).then(
        (success) => {
        console.log(success);
        this.router.navigate(['/dashboard']);
      }).catch(
        (err) => {
        console.log(err);
        this.error = err;
      })
    }
  }

  loginWithGoogle() {
    this.af.auth.login({
      provider: AuthProviders.Google
    }).then((success) => {
      this.router.navigate(['/dashboard']);
    }).catch((err) => {
     this.error = err;
    })
  }

  logout() {
    this.af.auth.logout().then((success) => {
      alert("you're logged out");
    });
  }
}
