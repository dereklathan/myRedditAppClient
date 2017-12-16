import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss']
})
export class ClientDetailComponent implements OnInit {
  id: number;
  client : {
    id: number,
    clientName: string,
    authUrl: string,
    redirectUrl: string,
    clientId: string,
    canDelete: boolean,
    redditUserId: number
  }

  constructor(private route: ActivatedRoute, private http: HttpClient, private cookieService: CookieService, private router: Router) {
    this.client = {
      id: 0,
      authUrl: '',
      redirectUrl: '',
      clientId: '',
      clientName: '',
      redditUserId: 0,
      canDelete: false,
    };
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      const headers = new HttpHeaders()
        .append('access-token',this.cookieService.get('accessToken'));
      this.http.get('http://localhost:8080/redditapp-1.0-SNAPSHOT/rest/clients/getclient?id=' + this.id, {headers: headers})
        .subscribe(
            data => {
              this.client = data['client'];
              if (this.client.authUrl !== '') {

              }
            },
          )
    });
  }

  authenticate() {
    window.open(this.client.authUrl);
    this.router.navigate(['/redditaccounts']);
  }

}
