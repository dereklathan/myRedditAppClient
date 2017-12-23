import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {
  permaLink: string;
  error: string;
  headers: HttpHeaders;
  response;
  constructor(private http: HttpClient, private _cookieService: CookieService, private router: Router) {
    this.permaLink = '';
    this.error = '';
    this.headers = new HttpHeaders().append('access-token', this._cookieService.get('accessToken'));
  }

  ngOnInit() {

  }

  getThing() {
    this.http.get('http://localhost:8080/redditapp-1.0-SNAPSHOT/rest/vote/listing?link=' + this.permaLink, {headers: this.headers})
      .subscribe(
        data => {
          this.response = data;
          this.error = this.response.error;
          console.log(this.response);
        },
        error => {
          console.log(error);
          this.router.navigate(['/login']);
        }
      );
  }
}
