import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogsComponent } from '../dialogs/dialogs.component';
import { FormserviceService } from '../services/formservice.service';
import { HttpClient,HttpResponse } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit{

data:any;
img:any;
images: any=[];


  constructor (private dialog:MatDialog ,private fs:FormserviceService,private http: HttpClient ){}
  showDataFlag = false;
  
  showData() {
    this.showDataFlag = true;
  }

  uploadedFiles: any =[];




  ngOnInit(): void {
    this.fs.GetStudentData().subscribe((e)=>{
      this.data=e;
    })
    this.fs.getimage().subscribe((response:any)=>{
      const reader = new FileReader();
      reader.onloadend = () =>{
        this.img = reader.result;
      };
      reader.readAsDataURL(response)
    })

    this.fs.getmultiimage().subscribe((e: any) => {
      for (let image of e.data) {
        let TYPED_ARRAY: any = new Uint8Array(image.image.data);
        const STRING_CHAR = TYPED_ARRAY.reduce((data: any, byte: any) => {
          return data + String.fromCharCode(byte);
        },'');
        let base64String = btoa(STRING_CHAR);
        this.images.push({name: image.imagename, image:'data:image/jpg;base64,' + base64String})
      }
  })
}


preview(i:any){
  Swal.fire({
    title: 'Preview Image',
    imageUrl: i,

  })
}



fileChange(event: any) {
  const selectedFiles: FileList = event.target.files;
  const formData = new FormData();
  
  for (let i = 0; i < selectedFiles.length; i++) {
    formData.append('images', selectedFiles[i]);
  }
  
  this.upload(formData);
  console.log(formData)
}

upload(formData: FormData) {
  this.fs.postmultiimage(formData).subscribe({});
  Swal.fire({
    title: 'Upload SuccessFully'
  })
  // .then((result) => {
  //   if (result.value==true) {
  //     location.reload();
  //   }});

}

  adddata(){
    this.dialog.open(DialogsComponent,{
      width:"30%"
    });
  }

  deletedata(n:any){
    this.fs.DeleteStudentData(n).subscribe({})
    
  }

  editdata(n:any){
    this.dialog.open(DialogsComponent,{
      width:"30%"
    });
    this.fs.setformdata(n)
  }
}
