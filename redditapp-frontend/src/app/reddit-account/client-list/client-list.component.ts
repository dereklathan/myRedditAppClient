import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';
@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {
  headers: HttpHeaders;
  clients: {
    clientName: string,
    clientId: string,
    id: number,
    canDelete: boolean,
    showConfirmDelete: boolean
  }[];
  redditUserId: number;
  redditUserName: string;
  error: string;
  id: number
  showAddClient: boolean
  clientName: string;
  clientId: string;
  clientSecret: string;
  clientResponse;
  showError: boolean;
  constructor(private http: HttpClient, private cookieService: CookieService, private route: ActivatedRoute, private router: Router) {
      this.redditUserName = '';
      this.showAddClient = false;
      this.headers = new HttpHeaders()
        .append('access-token',this.cookieService.get('accessToken'));
      this.showError = false;
   }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.id = params['id'];

      this.http.get('http://localhost:8080/redditapp-1.0-SNAPSHOT/rest/clients/getclients?id=' + this.id, {headers: this.headers})
        .subscribe(
            data => {
              this.showError = false;
              this.error = '';
              this.clientResponse = data['clients'];
              this.redditUserName = data['redditUserName'];
              for(let i=0;i<this.clientResponse.length;i++) {
                this.clientResponse[i].showConfirmDelete = false;
              }
            },
          );
    });
  }

  addClient() {
    this.showError = false;
    const request = {
      clientName: this.clientName,
      clientId: this.clientId,
      clientSecret: this.clientSecret,
      redditUserId: this.id
    };
    let requestString = JSON.stringify(request);
    this.clientName = '';
    this.clientId = '';
    this.clientSecret = '';
    this.toggleShowAddClient();
    this.http.post('http://localhost:8080/redditapp-1.0-SNAPSHOT/rest/clients/addclient', requestString, {headers: this.headers})
      .subscribe(
          data => {
            let response = data['clients'];
            if(response === undefined || response.length === 0) {
              this.error = data['error'];
              this.showError = true;
            }
            else {
              response[0].showConfirmDelete = false
              this.clientResponse.push(response[0]);
            }
          },
        );
  }

  getClientDetail(clientId: number) {
    this.router.navigate(['/redditaccounts/client/' + clientId]);
  }

  deleteClient(clientId: number) {
    this.showError = false;
    this.http.get('http://localhost:8080/redditapp-1.0-SNAPSHOT/rest/clients/deleteclient?id=' + clientId, {headers: this.headers})
      .subscribe(
        data => {
          if(data['error'] !== undefined) {
            this.error = data['error'];
            this.showError = true;
          }
          else {
            this.clientResponse.forEach((item, index) => {
              if(item.id == clientId) {
                this.clientResponse.splice(index, 1);
              }
            })
          }
        },
        error => {
          this.router.navigate(['/login']);
        }
      )
  }

  toggleShowAddClient() {
    this.showAddClient = !this.showAddClient;
  }

  toggleConfirmDelete(client) {
    client.showConfirmDelete = !client.showConfirmDelete;
  }
}
