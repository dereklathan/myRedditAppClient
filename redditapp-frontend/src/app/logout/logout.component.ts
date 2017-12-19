import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private _cookieService: CookieService) { }

  ngOnInit() {
    const token = this._cookieService.get('accessToken');
    const headers = new HttpHeaders().append('access-token', token);
    this.http.get('http://localhost:8080/redditapp-1.0-SNAPSHOT/rest/auth/logout', {headers: headers})
      .subscribe(
        data => {
          this._cookieService.set('accessToken', '');
          this.router.navigate(['login']);
        },
        error => {
          console.log(error);
        }
      )
  }

}
