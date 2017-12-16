import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientDetailComponent } from './client-detail/client-detail.component';

const routes: Routes = [
  {
    path: 'clients/:id',
    component: ClientListComponent
  },
  {
    path: 'client/:id',
    component: ClientDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RedditAccountRoutingModule { }
