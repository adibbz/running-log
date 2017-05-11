import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RunListComponent } from './runs/run-list/run-list.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { RouterModule, Routes } from '@angular/router';
import { UserSignupComponent } from './user/user-signup/user-signup.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { DropdownDirective } from './shared/dropdown.directive';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { ValidateEqualDirective } from './shared/validateEqual.directive';


// AngularFire Config
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

export const firebaseConfig = {
  apiKey: 'AIzaSyCbT3gX5SlbnnjdsOAiZQb4ADPSqBqBK4A',
  authDomain: 'running-log-2202b.firebaseapp.com',
  databaseURL: 'https://running-log-2202b.firebaseio.com',
  storageBucket: 'running-log-2202b.appspot.com',
  messagingSenderId: '96421559093'
};

//Routing
const appRoutes: Routes = [
  { path: 'dashboard', component: RunListComponent, canActivate: [AuthGuard] },
  { path: 'login', component: UserLoginComponent },
  { path: 'edit-user', component: UserEditComponent, canActivate: [AuthGuard] },
  { path: 'register', component: UserSignupComponent },
  { path: '',
      redirectTo: '/login',
      pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RunListComponent,
    UserLoginComponent,
    PageNotFoundComponent,
    UserSignupComponent,
    DropdownDirective,
    SidebarComponent,
    UserEditComponent,
    ValidateEqualDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
