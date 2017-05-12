import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit, OnDestroy {
  user = {};
  error: any;
  email: string;
  password: string;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    document.body.classList.add('login-bg');
    this.auth.isAuthenticated()
      .subscribe((user) => {
        if(user) {
          // Not the best way to handle but current fix to check if coming from /register
          if(localStorage.getItem('loggedInUserName') !== null) {
            this.router.navigate(['./dashboard']);
          }
        }
      })
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
