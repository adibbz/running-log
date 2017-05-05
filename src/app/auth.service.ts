import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

@Injectable()
export class AuthService {
  error: any;

  constructor(public af: AngularFire, private router: Router) {};

  // isLoggedIn() {
  //   this.af.auth.subscribe(auth => {
  //     if(auth) {
  //       this.name = auth.auth.displayName;
  //       this.loggedIn = true;
  //     }
  //   });
  // }

  logout() {
     this.af.auth.logout().then((success) => {
        console.log(success);
        this.router.navigate(['/login']);
      }).catch((err) => {
        console.log(err);
        this.error = err;
      })
  }

}
