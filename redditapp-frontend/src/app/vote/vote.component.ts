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
  score;
  response;
  totalVoters;
  voteRequest;
  constructor(private http: HttpClient, private _cookieService: CookieService, private router: Router) {

  }

  ngOnInit() {
    this.permaLink = '';
    this.error = '';
    this.headers = new HttpHeaders().append('Access-Token', this._cookieService.get('accessToken'));
  }

  getThing() {
    this.http.get('http://localhost:8080/redditapp-1.0-SNAPSHOT/rest/vote/getThing?link=' + this.permaLink, {headers: this.headers})
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

  submitVote() {
    var thingId;
    if(this.response.isComment) {
        thingId = this.response.comment.thingId;
      }
    else {
        thingId = this.response.threadLink.thingId;
    }
    this.voteRequest = {
      thingId: thingId,
      permalink: this.permaLink,
      score: this.response.score
    };
    let requestString =  JSON.stringify(this.voteRequest);
    console.log(requestString);
    this.http.post('http://localhost:8080/redditapp-1.0-SNAPSHOT/rest/vote/submitVote', requestString, {headers: this.headers})
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
