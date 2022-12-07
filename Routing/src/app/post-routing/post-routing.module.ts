import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivePostsComponent } from '../active-posts/active-posts.component';
import { RouterModule, Routes } from '@angular/router';
import { InactivePostsComponent } from '../inactive-posts/inactive-posts.component';

//ng g module postRouting

//seguire app-routing.module come modello di cosa fare

//queste rotte sono relative alla rotta genitore che trovate nel app-routing.module
const r:Routes = [
  { path: 'active', component:ActivePostsComponent},
  { path: 'inactive', component:InactivePostsComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(r) //qua usiamo forChild non forRoot perchè vogliamo queste rotte impostate come figli della rotta genitore (root sarebbe le rotte principali del sito, alla radice degli indirizzi)
  ],
  exports: [RouterModule] //esportiamo questo modulo esattamente come nel app-routing.module
})
export class PostRoutingModule {

}
