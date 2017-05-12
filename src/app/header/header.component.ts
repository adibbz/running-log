import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  error: any;
  name: any;
  loggedIn: boolean = true;

  constructor(private auth: AuthService) {}

  logout() {
    this.auth.logout().catch((err) => {
        console.log(err);
        this.error = err;
      });
  }

  ngOnInit() {
    if(localStorage.getItem('loggedInUserName') != null) {
      this.name = localStorage.getItem('loggedInUserName');
      this.loggedIn = true;
    }
  }

}
