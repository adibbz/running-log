import { CanActivate, Router } from '@angular/router';
import { Injectable } from "@angular/core";
import { AuthService, RunService } from './services/index';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): Observable<boolean> {
      return Observable.from(this.authService.getAuthState())
        .take(1)
        .map(state => !!state)
        .do(authenticated => {
          if (!authenticated)
            this.router.navigate([ '/login' ]);
        })
  }

}
