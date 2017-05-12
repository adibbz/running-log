import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  private sub: Subscription;
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.sub = this.authService.isAuthenticated().subscribe(authResp => {
      if(authResp) {
          if(localStorage.getItem('loggedInUserName') !== null) {
            this.isLoggedIn = true
          }
      } else {
        this.isLoggedIn = false;
      }
    });
  }
}
