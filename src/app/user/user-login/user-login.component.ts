import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit, OnDestroy {
  user = {};
  error: any;
  email: string;
  password: string;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    document.body.classList.add('login-bg');
  }

  loginWithEmail(formData) {
    this.auth.loginWithEmail(formData);
  }

  loginWithGoogle() {
    this.auth.loginWithGoogle()
    // .catch((err) => {
    //  this.error = err;
    // });
  }

  ngOnDestroy() {
    document.body.classList.remove('login-bg');
  }
}
