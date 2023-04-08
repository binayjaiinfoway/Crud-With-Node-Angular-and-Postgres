import { Component, OnInit } from '@angular/core';
import {MatDialog,MatDialogRef} from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormserviceService } from '../services/formservice.service';

@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.css']
})
export class DialogsComponent implements OnInit{

  localdata:any=[];
  xyz:any=null

  selectedFiles:any;

  constructor (private fb: FormBuilder ,private fs:FormserviceService ,private dlgRef:MatDialogRef<DialogsComponent>) {}

  TicketForm = this.fb.group({
    name: ['', Validators.required],
    age: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required] ,
    image: [''] , 

  })


  ngOnInit(): void {
    this.fs.getformdata().subscribe((e)=>{
      this.TicketForm.patchValue(e)
      this.xyz=e
    })
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files[0];
    console.log(this.selectedFiles)
  }


  BackToCard(){
    this.dlgRef.close();
  }

  Submitform(n:any){
  if(this.xyz==null){
    this.fs.PostStudentData(n.value).subscribe({})
  }else
  {
    this.TicketForm.value.image = this.selectedFiles.name
    this.fs.UpdateStudentData(this.TicketForm.value,this.xyz.id).subscribe({})
    const formdata = new FormData();
    formdata.append('image',this.selectedFiles)
    formdata.append('name',this.selectedFiles.name)
    // this.fs.postimage(formdata).subscribe({})
  }
  this.fs.setformdata(null);
    this.dlgRef.close();
  }

}
