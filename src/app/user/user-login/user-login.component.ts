import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';

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

  constructor(private auth: AuthService) {}

  loginWithEmail(formData) {
    this.auth.loginWithEmail(formData)
    // .catch((err) => {
    //  this.error = err;
    // });
  }

  loginWithGoogle() {
    this.auth.loginWithGoogle()
    .catch((err) => {
     this.error = err;
    });
  }
}
