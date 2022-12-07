import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { RegisterRequest } from '../auth-response';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  err:string|undefined;

  constructor(private authSrv:AuthService, private r:Router) { }

  ngOnInit(): void {}

  register(f:NgForm):void {
    if(f.valid) {
      let data :RegisterRequest = {
        email: f.value.email,
        password: f.value.password,
        nome: f.value.nome
      }
      console.log(data);
      this.authSrv.register(data).pipe(catchError(err=>{
        this.err = err.error
        throw err
      })).subscribe(res=>{
        console.log(res);
        this.err = undefined
        //TODO: rotta a login con parametro emial per autocompletamento
        this.r.navigate(["login"]);
      })
    }
  }

}
