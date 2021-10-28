
import { CommonModule } from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './screen/header/header.component';
import { HomeComponent } from './screen/home/home.component';
import { LoginComponent } from './screen/login/login.component';
import { MainComponent } from './screen/main/main.component';
import { SidebarComponent } from './screen/main/sidebar/sidebar.component';
import { BoxChatComponent } from './screen/main/box-chat/box-chat.component';
import { UserPanelComponent } from './screen/main/user-panel/user-panel.component';
import {JwtInterceptor} from "./until/jwt.interceptor";
export function tokenGetter() {
  return localStorage.getItem('token');
}

export function getAuthScheme(request: string) {
  return 'http://localhost:4200/login ';
}

export function jwtOptionsFactory() {
  return {
    tokenGetter,
    authScheme: getAuthScheme,
  };
}
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    MainComponent,
    SidebarComponent,
    BoxChatComponent,
    UserPanelComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
      },
    }),
    AppRoutingModule,


  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
