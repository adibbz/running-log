import { CanActivate, Router } from '@angular/router';
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import {Observable} from 'rxjs/Observable';
import { } from 'rxjs/add/operator/map';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {}

  canActivate() {
    return this.authService.getAuthState().map(e => {
      if (e) {
        return true;
      } else {
        this.router.navigate(['./login'])
      }
    })

  }

}
