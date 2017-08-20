import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/index';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html'
})
export class UserSignupComponent implements OnInit, OnDestroy {
  error: any;
  name: string;
  email: string;
  password: string;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {
    document.body.classList.add('login-bg');
    if(this.authService.isAuthenticated() == true) {
      this.router.navigate(['./dashboard'])
    }
  }

  onSubmit(formData) {
    this.authService.register(formData)
    // .catch((err) => {
    //    console.log(err);
    //    this.error = err;
    // });
  }

  ngOnDestroy() {
    document.body.classList.remove('login-bg');
  }

}
