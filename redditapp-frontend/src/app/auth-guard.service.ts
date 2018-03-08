import { Injectable } from '@angular/core';
import { Router, Resolve, CanActivate } from '@angular/router';
import { HttpClient, HttpHeaders, HttpHandler } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthGuardService implements CanActivate {

  accessToken: string;
  constructor(private http: HttpClient, private router: Router, private _cookieService: CookieService) {}

  canActivate(): Promise<boolean> {
    const accessToken = this._cookieService.get('accessToken');
    if (accessToken !== '') {
      const headers = new HttpHeaders().append('Access-Token', accessToken);
      return new Promise<boolean>((resolve, reject) => {
        this.http.get('http://localhost:8080/redditapp-1.0-SNAPSHOT/rest/auth/validate', {headers: headers})
          .toPromise().then(
            data => {
              resolve(true);
            },
            error => {
              this.router.navigate(['login']);
              resolve(false);
            }
          )
      });
    } else {
      this.router.navigate(['login']);
      return new Promise<boolean>(function(resolve, reject) {
        resolve(false);
      });
    }
  }

}
