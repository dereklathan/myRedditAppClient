import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CookieModule } from 'ngx-cookie';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuardService } from './auth-guard.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RedditAccountModule } from './reddit-account/reddit-account.module';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { VoteModule } from './vote/vote.module';
import { LogoutComponent } from './logout/logout.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    PageNotFoundComponent,
    LogoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CookieModule,
    RedditAccountModule,
    VoteModule
  ],
  providers: [
    CookieService,
    AuthGuardService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
