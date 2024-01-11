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

  getChById(chId: number):Observable<CentreHospitalier>{
    return this.http.get<CentreHospitalier>(`${this.baseUrl}/CentreHospitaliers/${chId}`);
  }

  editCh(chId: number, centreHospitalier: CentreHospitalier): Observable<CentreHospitalier> {
    const url = `${this.baseUrl}/CentreHospitaliers/${chId}`;
    return this.http.put<CentreHospitalier>(url, centreHospitalier);
  }

  addCh(centreHospitalier: CentreHospitalier): Observable<CentreHospitalier> {
    const url = `${this.baseUrl}/CentreHospitaliers`; 
    return this.http.post<CentreHospitalier>(url, centreHospitalier);
  }

  archiveCentreHospitalier(chId: number): Observable<CentreHospitalier> {
    const url = `${this.baseUrl}/CentreHospitaliers/${chId}/archive`;
    return this.http.put<CentreHospitalier>(url, {});
  }

}
