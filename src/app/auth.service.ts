import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthService {
  private authState: Observable<any> = null;
  private isAuth: boolean;
  error: any;
  user;

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth, private router: Router) {
    this.authState = this.afAuth.authState;
  };

  // private handleError (error) {
  //   return Observable.throw(error.json());
  // }

  loginWithEmail(formData) {
    if(formData.valid) {
      this.afAuth.auth.signInWithEmailAndPassword(formData.value.email,formData.value.password)
      .then((success) => {
        localStorage.setItem('loggedInUserName', success.displayName);
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
     if(formData.valid) {
      this.afAuth.auth.createUserWithEmailAndPassword(formData.value.email, formData.value.password)
      .then((user) => {
          this.db.object(`/users/${user.uid}`).update({
            name: formData.value.name
          });
          this.router.navigate(['./login']);
      })
      .catch(function(error) {
        // Handle Errors here.
        //var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
        // ...
      })
    }
  }

  isAuthenticated(): boolean {
    this.authState.subscribe((state) => {
      if(state !== null) {
        this.isAuth = true
      } else {
        this.isAuth = false
      }
    })
    return this.isAuth;
  }

  getAuthState(): Observable<any> {
    return this.authState;
  }

}
