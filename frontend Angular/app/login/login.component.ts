import { Component, OnInit } from '@angular/core';
import {MatDialog,MatDialogRef} from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormserviceService } from '../services/formservice.service';
import { Router, RouterModule } from '@angular/router';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor (private fb: FormBuilder,private fs:FormserviceService, private routes:Router , private dialog:MatDialog) {}

  LoginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    type:'password'
  })

  ngOnInit(): void {
    localStorage.clear();
  }


  Register(){
        this.dialog.open(RegisterComponent,{
      width:"30%"
    });
  }

  Submitform(n:any){
    this.fs.PostLogin(n.value).subscribe((data: any) => {
      localStorage.setItem("Userinfo", JSON.stringify(data.data));
      localStorage.setItem("time", data.data.time);
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("refreshtoken", data.data.refreshtoken);
      this.routes.navigate(['/dashboard'])
    })
  }

}
