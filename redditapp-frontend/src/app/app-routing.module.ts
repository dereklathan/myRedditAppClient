import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RedditAccountComponent } from './reddit-account/reddit-account.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CookieService } from 'ngx-cookie';
import { AuthGuardService } from './auth-guard.service';
import { ClientListComponent } from './reddit-account/client-list/client-list.component';
import { ClientDetailComponent } from './reddit-account/client-detail/client-detail.component';
import { RedditAccountDeletedComponent } from './reddit-account/reddit-account-deleted/reddit-account-deleted.component'


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'redditaccounts',
    component: RedditAccountComponent,
    children : [
      {
        path: 'clients/:id',
        component: ClientListComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'client/:id',
        component: ClientDetailComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'deleted',
        component: RedditAccountDeletedComponent,
        canActivate: [AuthGuardService]
      }
    ],
    canActivate: [AuthGuardService]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {
    constructor() {}
}
