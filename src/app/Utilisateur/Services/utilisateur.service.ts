import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { subscriptionLogsToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { UtilisateurModel } from 'src/app/shared/Model/Utilisateur.model';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  private baseUrl = 'http://localhost:9006/api'; 

  constructor(private http: HttpClient) {}

  getUsers(): Observable<UtilisateurModel[]> {
    return this.http.get<UtilisateurModel[]>(this.baseUrl+'/listeUser');

  } 

     // Méthode pour ajouter un utilisateur
 /* addUser(user: UtilisateurModel): Observable<UtilisateurModel> {
    return this.http.post<UtilisateurModel>(`${this.baseUrl}/AjoutUser`, user);

  }*/
  addUser(Utilisateur: UtilisateurModel){
    return this.http.post<UtilisateurModel>(this.baseUrl+'AjoutUsers',Utilisateur);
  }
  editUser(Utilisateur: UtilisateurModel, UtilisateurID: number){
    return this.http.put<UtilisateurModel>(this.baseUrl+'modifierUser/'+UtilisateurID,Utilisateur);
  }

}
