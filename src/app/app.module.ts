import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { HeaderComponent } from './header/header.component';
import { RunListComponent } from './runs/run-list/run-list.component';
import { UserLoginComponent } from './user/user-login/user-login.component';

// AngularFire Config
export const firebaseConfig = {
  apiKey: 'AIzaSyCbT3gX5SlbnnjdsOAiZQb4ADPSqBqBK4A',
  authDomain: 'running-log-2202b.firebaseapp.com',
  databaseURL: 'https://running-log-2202b.firebaseio.com',
  storageBucket: 'running-log-2202b.appspot.com',
  messagingSenderId: '96421559093'
};

//Auth(Google enabled in FB console)
const firebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Redirect
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RunListComponent,
    UserLoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
