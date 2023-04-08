import { Injectable } from '@angular/core';
import { BehaviorSubject ,Observable} from 'rxjs';
import { HttpClient , HttpRequest, HttpEvent} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FormserviceService {

  constructor( private http : HttpClient) { }

  private formdata=new BehaviorSubject<any>(null);


  setformdata(n:any){
    this.formdata.next(n);
  };

  getformdata(){
    return this.formdata.asObservable();
  }

  GetStudentData(): Observable <any>{
    return this.http.get(`http://localhost:5000/student`)
  };
  PostStudentData(data:any): Observable <any>{
    return this.http.post(`http://localhost:5000/student`, data)
  };
  UpdateStudentData(data:any, id:any): Observable <any>{
    return this.http.put(`http://localhost:5000/student/${id}`, data)
  };
  DeleteStudentData(id:any): Observable <any>{
    return this.http.delete(`http://localhost:5000/student/${id.id}`)
  };

  PostLogin(data:any): Observable <any>{
    return this.http.post(`http://localhost:5000/student/login`, data)
  };

  postimage(data:any): Observable <any>{
    return this.http.post(`http://localhost:5000/student/postimage`, data)
  };

  getimage(): Observable <any>{
    return this.http.get(`http://localhost:5000/student/getimage`,{responseType:'blob'});
  };

  postmultiimage(data:any): Observable <any>{
    return this.http.post(`http://localhost:5000/student/postmultiimage`, data)
  };

  getmultiimage(): Observable <any>{
    return this.http.get(`http://localhost:5000/student/getmultiimage`);
  };

}
