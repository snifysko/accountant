import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import {UsersService} from './shared/services/users.service';
import {AuthService} from './shared/services/auth.service';
import { SystemModule } from './sysytem/system.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AuthModule,
	AppRoutingModule,
	SystemModule,
  ],
  providers: [UsersService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
