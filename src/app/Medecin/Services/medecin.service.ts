import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medecin } from 'src/app/shared/Model/Medecin';
import { Specialite } from 'src/app/shared/Model/Specialite';

@Injectable({
  providedIn: 'root'
})
export class MedecinService {

  
  private baseUrl = 'http://localhost:9006/api'; 

  constructor(private http: HttpClient) {}

  getMedecin(): Observable<Medecin[]>{
    return this.http.get<Medecin[]>(this.baseUrl+"/Medecins");
  }

  getMedecinById(medecinId: number): Observable<Medecin> {
    return this.http.get<Medecin>(`${this.baseUrl}/Medecin/${medecinId}`);
  }

  getSpecialiteByMedecin(medecinId: number): Observable<Specialite> {
    return this.http.get<Specialite>(`${this.baseUrl}/getSpecialiteByMedecin/${medecinId}`);
  }
  
  
  

}
