import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CentreHospitalier } from 'src/app/shared/Model/CentreHospitalier';

@Injectable({
  providedIn: 'root'
})
export class CentreHospitalierService {

  private baseUrl = 'http://localhost:9006/api'; 



  constructor(private http: HttpClient) { }

  getCh(): Observable<CentreHospitalier[]>{
    return this.http.get<CentreHospitalier[]>(this.baseUrl+'/CentreHospitaliers');
  }

}
