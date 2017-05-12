import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html'
})
export class UserSignupComponent implements OnInit, OnDestroy {
  error: any;
  name: string;
  email: string;
  password: string;

  constructor(public auth: AuthService, private router: Router) {}

  ngOnInit() {
    document.body.classList.add('login-bg');
    this.auth.isAuthenticated()
      .subscribe((user) => {
        if(user) {
          if(localStorage.getItem('loggedInUserName') !== null) {
            this.router.navigate(['./dashboard']);
          }
        }
      })
  }

  onSubmit(formData) {
    this.auth.register(formData)
    // .catch((err) => {
    //    console.log(err);
    //    this.error = err;
    // });
  }

  ngOnDestroy() {
    document.body.classList.remove('login-bg');
  }

}
