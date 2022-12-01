import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivePostsComponent } from './active-posts/active-posts.component';
import { HomeComponent } from './home/home.component';
import { InactivePostsComponent } from './inactive-posts/inactive-posts.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "active",
    component: ActivePostsComponent
  },
  {
    path: "active/false",
    component: InactivePostsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
