import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { AlertService } from './alert.service';



@Injectable()
export class AuthService {
  private authState: Observable<any> = null;
  private isAuth: boolean;
  error: any;
  user;

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private router: Router,
    private alertService: AlertService)
  {
    this.authState = this.afAuth.authState;
    // this.authState.subscribe(user => {
    //   if(user) {
    //      //localStorage.setItem('UserToken', 'true');
    //   }
    // })
  };

  private handleError(error) {
    return Observable.throw(error.json());
  }

  loginWithEmail(formData) {
    if(formData.valid) {
      this.afAuth.auth.signInWithEmailAndPassword(formData.value.email,formData.value.password)
      .then((success) => {
        localStorage.setItem('loggedInUserName', success.displayName);
        localStorage.setItem('UserToken', 'true');
        window.location.href = '/dashboard';
      }).catch((err) => {
        this.alertService.error(err.message);
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
        //this.router.navigate(['/dashboard']);
        window.location.href = '/dashboard';
      }).catch((err) => {
        this.alertService.error(err.message);
      })
  }

  logout() {
    return this.afAuth.auth.signOut()
      .then((success) => {
        // console.log(success);
        localStorage.removeItem('loggedInUserName');
        localStorage.removeItem('UserToken');
        //this.router.navigate(['/login']);
        window.location.href = '/login';
      })
  }

  register(formData) {
     if(formData.valid) {
      this.afAuth.auth.createUserWithEmailAndPassword(formData.value.email, formData.value.password)
      .then((user) => {
          this.db.object(`/users/${user.uid}`).update({
            name: formData.value.name
          });
          this.logout();
      })
      .catch((err) => {
        this.alertService.error(err.message);
      })
    }
  }

  isAuthenticated(): boolean {
    if(localStorage.getItem('UserToken')) {
      return true
    }
    return false
  }

  getAuthState(): Observable<any> {
    return this.authState;
  }

}
