import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // logged = false;
  user:{email:string,id:number}|undefined;

  constructor(private authSrv:AuthService) { }

  ngOnInit(): void {
    this.authSrv.getLoggedObs().subscribe(res=>{
      if(res){
        this.user = res
      } else {
        this.user = undefined
      }
    })
  }

}
