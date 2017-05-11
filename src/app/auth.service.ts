import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthService {
  error: any;
  user;

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth, private router: Router) {};

  // private handleError (error) {
  //   return Observable.throw(error.json());
  // }

  loginWithEmail(formData) {
    if(formData.valid) {
      this.afAuth.auth.signInWithEmailAndPassword(formData.value.email,formData.value.password)
      .then((success) => {
        localStorage.setItem('loggedInUserName', formData.value.name);
        this.router.navigate(['/dashboard']);
      }).catch((err) => {
        alert(err.message);
        //this.handleError(err);
      })
    }
  }

  loginWithGoogle() {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((success) => {
        // Right now it is setting every time you login with google
        // Probably need to handle somewhere else and catch errors from promise
        this.db.object(`/users/${success.user.uid}`).update({
            name: success.user.displayName
        });
        localStorage.setItem('loggedInUserName', success.user.displayName);
        this.router.navigate(['/dashboard']);
      }).catch((err) => {
        console.log(err)
        this.error = err;
      })
  }

  logout() {
    return this.afAuth.auth.signOut()
      .then((success) => {
        // console.log(success);
        localStorage.removeItem('loggedInUserName');
        this.router.navigate(['/login']);
      })
  }

  register(formData) {
    //  if(formData.valid) {
    //   return this.afAuth.auth.createUser({
    //     email: formData.value.email,
    //     password: formData.value.password
    //   }).then((user) => {
    //       return this.db.object(`/users/${user.uid}`).update({
    //         name: formData.value.name
    //       });
    //   }).then((success) => {
    //     this.router.navigate(['/login'])
    //   })
    // }
  }

  isAuthenticated(): Observable<any> {
    return this.afAuth.authState;
  //   this.afAuth.authState.subscribe(user => {
  //     if(user) {
  //       // user logged in
  //       const uid = user.uid;
  //       this.user = this.db.object(`/users/${uid}`)
  //         .subscribe(user => {
  //             localStorage.setItem('loggedInUserName', user.name);
  //         });
  //         return true;
  //     }
  //     else {
  //       // user not logged in
  //       return false;
  //     }
  //   });
  }

}
