import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { PostService } from './post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Routing';

  logged = false

  constructor(private postSRV:PostService, private authSrv:AuthService) {}

  ngOnInit(): void {
    this.postSRV.fetchData()
    this.authSrv.getLoggedObs().subscribe(res=>{
      if(res){
        this.logged = true
      } else {
        this.logged = false
      }
    })
  }

  logout() {
    this.authSrv.logout()
  }
}
