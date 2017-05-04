import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent {
  state: string = '';
  error: any;
  email: string;
  password: string;

  constructor(public af: AngularFire,private router: Router) {}

  onSubmit(formData) {
    if(formData.valid) {
      console.log(formData.value);
      this.af.auth.createUser({
        email: formData.value.email,
        password: formData.value.password
      }).then((success) => {
        console.log(success);
        this.router.navigate(['/login'])
      }).catch((err) => {
        console.log(err);
        this.error = err;
      })
    }
  }

}
