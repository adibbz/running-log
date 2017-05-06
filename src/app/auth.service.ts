import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

@Injectable()
export class AuthService {
  error: any;
  user;

  constructor(public af: AngularFire, private router: Router) {};

  loginWithEmail(formData) {
    if(formData.valid) {
      this.af.auth.login({
        email: formData.value.email,
        password: formData.value.password
      },
      {
        provider: AuthProviders.Password,
        method: AuthMethods.Password,
      }).then((success) => {
        // console.log(success);
        this.router.navigate(['/dashboard']);
      }).catch((err) => {
        console.log(err);
        this.error = err;
      })
    }
  }

  loginWithGoogle() {
    return this.af.auth.login({
      provider: AuthProviders.Google
    }).then((success) => {
      // console.log(success);
      this.af.database.object(`/users/${success.auth.uid}`).update({
          name: success.auth.displayName
      });
      this.router.navigate(['/dashboard']);
    }).catch((err) => {
     this.error = err;
    })
  }

  logout() {
    return this.af.auth.logout().then((success) => {
      // console.log(success);
      this.router.navigate(['/login']);
    })
  }

  register(formData) {
     if(formData.valid) {
      return this.af.auth.createUser({
        email: formData.value.email,
        password: formData.value.password
      }).then((user) => {
          return this.af.database.object(`/users/${user.uid}`).update({
            name: formData.value.name
          });
      }).then((success) => {
        this.router.navigate(['/login'])
      })
    }
  }

  isAuthenticated() {
    this.af.auth.subscribe(user => {
      if(user) {
        // user logged in
        const uid = user.uid;
        // SEEMS TO CACHE USER NAME -- NAVBAR DOESN'T UPDATE UNLESS REFRESH, POSSIBLY THE SNAPSHOT
        this.user = this.af.database.list(`/users/${uid}`, { preserveSnapshot: true})
          .subscribe(snapshots => {
              snapshots.forEach(snapshot => {
                //console.log(snapshot.val());
                localStorage.setItem('loggedInUserName', snapshot.val());
              });
          })
      }
      else {
        // user not logged in
        return false;
      }
    });
  }

}
