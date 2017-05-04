import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  name: any;
  loggedIn: boolean = false;
  error: any;

  constructor(public af: AngularFire,private router: Router) {

    this.af.auth.subscribe(auth => {
      if(auth) {
        this.name = auth.auth.displayName;
        this.loggedIn = true;
      }
    });

  }

  logout() {
     this.af.auth.logout().then((success) => {
        console.log(success);
        this.router.navigate(['/login']);
      }).catch((err) => {
        console.log(err);
        this.error = err;
      })
  }

  ngOnInit() {
  }

}
