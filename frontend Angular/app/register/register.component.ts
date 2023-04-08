import { Component, OnInit } from '@angular/core';
import {MatDialog,MatDialogRef} from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormserviceService } from '../services/formservice.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor (private fb: FormBuilder ,private fs:FormserviceService ,private dlgRef:MatDialogRef<RegisterComponent>) {}

  RegisterForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  })


  BackToCard(){
    this.dlgRef.close();
  }

  Submitform(n:any){
    this.fs.PostStudentData(n.value).subscribe({})
    this.dlgRef.close();
  }


}
