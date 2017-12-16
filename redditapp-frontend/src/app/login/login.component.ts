import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { CookieModule } from 'ngx-cookie';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: string;
  pass: string;
  error: string;

  constructor(private http: HttpClient, private router: Router, private _cookieService: CookieService) { }

  ngOnInit() {
    this.user = '';
    this.pass = '';
    this.error = '';
  }

  login() {
    this.error = '';
    const request = {
      username: this.user,
      password: this.pass
    };
    const requestString = JSON.stringify(request);
    let response = null;
    this.http.post('http://localhost:8080/redditapp-1.0-SNAPSHOT/rest/auth/login', requestString)
      .subscribe(data => {
        response = data['accessToken'];
        if (response == null) {
          this.error = 'Username or password invalid';
        } else {
          this._cookieService.set('accessToken', response);
          this.router.navigate(['']);
        }
      },
      error => {
        this.error = 'Username or password invalid';
      });
  }

}
