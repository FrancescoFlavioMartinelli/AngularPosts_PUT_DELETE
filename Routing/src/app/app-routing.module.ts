import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivePostsComponent } from './active-posts/active-posts.component';
import { HomeComponent } from './home/home.component';
import { InactivePostsComponent } from './inactive-posts/inactive-posts.component';
import { LoginComponent } from './login/login.component';
import { PostComponent } from './post/post.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  //partendo da questa impostazione delle pagine rendiamo i child lazy loading, ovvero i componenti saranno caricati solo quando entriamo nella pagina stessa
  {
    path: "posts",
    component: PostComponent,
    // children: [
    //   {
    //     path: "active",
    //     component: ActivePostsComponent
    //   },
    //   {
    //     path: "inactive",
    //     component: InactivePostsComponent
    //   }
    // ]
    loadChildren: ()=> import('./post-routing/post-routing.module').then(m => m.PostRoutingModule)
    //quando raggiungo questa pagina carica il modulo a quell'indirizzo
    //quando è stato caricato usa la classe PostRoutingModule come riferimento (osservare cosa sono i parametri che otteniamo!)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
