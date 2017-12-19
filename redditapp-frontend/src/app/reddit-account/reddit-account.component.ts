import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-reddit-account',
  templateUrl: './reddit-account.component.html',
  styleUrls: ['./reddit-account.component.scss']
})
export class RedditAccountComponent implements OnInit {
  results: {
    id: number,
    username: string
    canDelete: boolean
    showConfirmDelete: boolean
  }[];
  addResponse: string[];
  reddituser: string;
  redditpass: string;
  confirmpass: string;
  error: string;
  headers: HttpHeaders;
  constructor(private http: HttpClient, private _cookieService: CookieService, private router: Router ) { }

  ngOnInit() {
    const accessToken = this._cookieService.get('accessToken');
    this.headers = new HttpHeaders();
    if (accessToken !== '') {
      this.headers = this.headers.append('Access-Token', accessToken);
    }
    this.reddituser = '';
    this.redditpass = '';
    this.confirmpass = '';
    this.error = '';
    this.http.get('http://localhost:8080/redditapp-1.0-SNAPSHOT/rest/redditusers/getredditusers', {headers: this.headers})
      .subscribe(data => {
        this.results = data['redditUsers'];
        for(let i=0;i<this.results.length;i++) {
          this.results[i].showConfirmDelete = false;
        }
        if (data['error'] != null) {
          this.error = data['error'];
        }
      },
      error => {
        this.router.navigate(['/login']);
      });
  }

  addUser() {
    if (this.reddituser === '') {
      this.error = 'Username cannot be blank';
      return;
    }
    if (this.redditpass !== this.confirmpass) {
      this.error = 'Passwords do not match';
      return;
    }

    const request = {
      username: this.reddituser,
      password: this.redditpass
    };
    this.error = '';
    const requestString = JSON.stringify(request);
    let addResponse = null;
    this.http.post('http://localhost:8080/redditapp-1.0-SNAPSHOT/rest/redditusers/addreddituser', requestString, {headers: this.headers })
      .subscribe(data => {
        addResponse = data['redditUsers'];
        if (addResponse.length === 0) {
          this.error = data['error'];
        } else {
          addResponse[0].showConfirmDelete = false;
          this.results.push(addResponse[0]);
        }
      },
      error => {
        this.router.navigate(['/login']);
      });
    this.reddituser = '';
    this.redditpass = '';
    this.confirmpass = '';
  }

  deleteRedditUser(redditUserId: number) {
    this.error = '';
    this.http.get('http://localhost:8080/redditapp-1.0-SNAPSHOT/rest/redditusers/deletereddituser?id=' + redditUserId, {headers: this.headers})
      .subscribe(
        data => {
          if(data['error'] !== undefined) {
            this.error = data['error'];
          }
          else {
            this.results.forEach((item, index) => {
              if(item.id == redditUserId) {
                this.results.splice(index, 1);
              }
            })
          }
        },
        error => {
          this.router.navigate(['/login']);
        }
      )
  }

  toggleConfirmDelete(redditUser) {
    redditUser.showConfirmDelete = !redditUser.showConfirmDelete;
  }

}
