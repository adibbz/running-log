import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent {
  error: any;
  name: string;
  email: string;
  password: string;

  constructor(public auth: AuthService) {}

  onSubmit(formData) {
    this.auth.register(formData)
    // .catch((err) => {
    //    console.log(err);
    //    this.error = err;
    // });
  }

}
