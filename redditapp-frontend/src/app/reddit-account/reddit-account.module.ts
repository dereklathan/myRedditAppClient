import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RedditAccountRoutingModule } from './reddit-account-routing.module';
import { RedditAccountComponent } from './reddit-account.component';
import { ClientDetailComponent } from './client-detail/client-detail.component';
import { ClientListComponent } from './client-list/client-list.component';
import { FormsModule } from '@angular/forms';
import { RedditAccountDeletedComponent } from './reddit-account-deleted/reddit-account-deleted.component';

@NgModule({
  imports: [
    CommonModule,
    RedditAccountRoutingModule,
    FormsModule
  ],
  declarations: [
    RedditAccountComponent,
    ClientDetailComponent,
    ClientListComponent,
    RedditAccountDeletedComponent,
  ],
  exports: [RedditAccountComponent,
  ClientListComponent],
  providers: [],
  bootstrap: [RedditAccountComponent]
})
export class RedditAccountModule { }
