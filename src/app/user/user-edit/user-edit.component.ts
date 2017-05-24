import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../auth.service';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { User } from '../user.model';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  auth;
  user: User = new User();
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  passwordMessage: boolean = false;
  errorMessage: string;


  constructor(private authService: AuthService, private db: AngularFireDatabase) {
    this.authService.getAuthState().take(1).subscribe(auth => {
      this.auth = auth;
    })
  }

  ngOnInit() {
    this.authService.getAuthState()
      .subscribe(user => {
      if(user) {
        this.user.photoURL = user.photoURL;
        this.user.email = user.email;
        this.user.uid = user.uid;
        this.db.object(`/users/${this.user.uid}`)
          .subscribe(user => {
            this.user.name = user.name;
          });
      }
    });
  }

  updateNameandEmail(formData) {
    if(formData.value.name) {
      this.auth.updateProfile({
        displayName: formData.value.name,
        photoURL: 'https://upload.wikimedia.org/wikipedia/commons/3/34/PICA.jpg'
      }).then(() => {
          this.db.object(`/users/${this.user.uid}`).update({
            name: formData.value.name
          });
          localStorage.setItem('loggedInUserName', formData.value.name);
          console.log('updated');
      })
    }
    if(formData.value.email) {
      this.auth.updateEmail(formData.value.email)
      .then(() => {
        // Update successful.
        console.log("updated email to ", formData.value.email);
      }, function(error) {
        // An error happened.
        console.log(error)
      });
    }
  }

  updatePassword(newPassword, isValid: boolean){
    this.auth.updatePassword(newPassword.password).then(function() {
      // Update successful.
      //this.passwordMessage = true;
      alert("Password updated!")
    }, function(err) {
      // An error happened.
      alert(err.message);
      //this.errorMessage = err.message;
    });

  }

}
