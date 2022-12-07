import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from '../auth-response';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  form!:FormGroup;

  constructor(private fb:FormBuilder, private authSrv:AuthService, private r:Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [],
      password: []
    })

    console.log(this.getFormControl("email"));
    
  }

  login() {
    if(this.form.valid) {
      let data :LoginRequest = {
        email: this.getFormControl('email').value,
        password: this.getFormControl('password').value
      }
      console.log(data);
      this.authSrv.login(data).subscribe(res=>{
        this.r.navigate(['/'])
      })
    }
  }

  getFormControl(n:string){
    return this.form.get(n) as FormControl
  }

}
