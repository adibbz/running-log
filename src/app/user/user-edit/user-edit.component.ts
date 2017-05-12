import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit, OnDestroy {
  user: Observable<firebase.User>;
  password: string;
  confirmPassword: string;
  public passwordObj;
  passwordMessage: boolean = false;
  errorMessage;

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.user = afAuth.authState;

  }

  ngOnInit() {

    this.passwordObj = {
      password: '',
      confirmPassword: ''
    }

    this.afAuth.authState.subscribe(user => {
      if(user) {
        //console.log(user)
       // this.user = user.auth;
        const uid = user.uid;
        this.db.object(`/users/${uid}`)
          .subscribe(users => {
            //console.log(users);
            //this.user.name = users.name;
            //console.log(this.user);
          });
      }
    });
  }

  //updateYo() {
  //   // this.authState.auth.updateProfile({
  //   //   displayName: 'Yo',
  //   //   photoURL: 'https://upload.wikimedia.org/wikipedia/commons/3/34/PICA.jpg'
  //   // }).then(() => {
  //   //   console.log('yo');
  //   // })
  //   this.afAuth.updateEmail("bobby@bob.com").then(function() {
  //     // Update successful.
  //     console.log("yo");
  //   }, function(error) {
  //     // An error happened.
  //     console.log(error)
  //   });
  // }

  // updatePassword(newPassword, isValid: boolean){
  //   console.log(newPassword.password, isValid);

  //   this.afAuth.auth.updatePassword(newPassword.password).then(function() {
  //     // Update successful.
  //     this.passwordMessage = true;
  //   }, function(err) {
  //     // An error happened.
  //     console.log(err.message);
  //     this.errorMessage = err.message;
  //   });

  // }

  ngOnDestroy() {
   //this.afAuth.unsubscribe;
  }

}
