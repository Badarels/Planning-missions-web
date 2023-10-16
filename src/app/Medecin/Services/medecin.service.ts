import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medecin } from 'src/app/shared/Model/Medecin';

@Injectable({
  providedIn: 'root'
})
export class MedecinService {

  
  private baseUrl = 'http://localhost:9006/api/'; 

  constructor(private http: HttpClient) {}

  getMedecin(): Observable<Medecin[]>{
    return this.http.get<Medecin[]>(this.baseUrl+"/Medecins");
  }

}
