import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Adresse } from 'src/app/shared/Model/Adresse';
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
    return this.http.get<Medecin>(`${this.baseUrl}/Medecins/${medecinId}`);
  }

  getSpecialite(): Observable<Specialite[]> {
    return this.http.get<Specialite[]>(this.baseUrl + "/Specialites")
      .pipe(
        catchError((error: any) => {
          console.error('An error occurred:', error);
          return throwError(error);
        })
      );
  }
  getAdresse(): Observable<Adresse[]> {
    return this.http.get<Adresse[]>(this.baseUrl + "/Adresses")
      .pipe(
        catchError((error: any) => {
          console.error('An error occurred:', error);
          return throwError(error);
        })
      );

  }
  getSpecialiteByMedecin(medecinId: number): Observable<Specialite> {
    return this.http.get<Specialite>(`${this.baseUrl}/getSpecialiteByMedecin/${medecinId}`);
  }
  searchMedecinsByVille(ville: string): Observable<Medecin[]> {
    return this.http.get<Medecin[]>(`${this.baseUrl}/getMedecinByVille/${ville}`);
  }

  ajoutMedecin(medecin: Medecin): Observable<Medecin>{
    return this.http.post<Medecin>(`${this.baseUrl}/Medecins`, medecin);
  }


 /* ajoutMedecin(medecin: any, httpOptions: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + "/Medecins", medecin, httpOptions);
  }*/

}
