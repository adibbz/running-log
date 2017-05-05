import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  name: any;
  loggedIn: boolean = false;

  constructor(public af: AngularFire, private auth: AuthService) {
    //this.auth.isLoggedIn();
  }

  logout() {
    this.auth.logout();
  }

  ngOnInit() {
  }

}
