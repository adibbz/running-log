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

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    document.body.classList.add('login-bg');
    if(this.authService.isAuthenticated() == true) {
      this.router.navigate(['./dashboard'])
    }
  }

  loginWithEmail(formData) {
    this.authService.loginWithEmail(formData);
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle()
    // .catch((err) => {
    //  this.error = err;
    // });
  }

  ngOnDestroy() {
    document.body.classList.remove('login-bg');
  }
}
