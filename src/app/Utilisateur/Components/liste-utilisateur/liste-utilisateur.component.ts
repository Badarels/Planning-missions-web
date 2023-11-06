import { Component, OnInit } from '@angular/core';
import { UtilisateurModel } from 'src/app/shared/Model/Utilisateur.model';
import { UtilisateurService } from '../../Services/utilisateur.service';
import { Subscription } from 'rxjs';
import { RoleModel } from 'src/app/shared/Model/Role.Model';

@Component({
  selector: 'app-liste-utilisateur',
  templateUrl: './liste-utilisateur.component.html',
  styleUrls: ['./liste-utilisateur.component.css']
})
export class ListeUtilisateurComponent implements OnInit {
  
  ngOnInit(): void {
    this.getUtilisateur();
  }

  users= [] as UtilisateurModel[];
  roles= [] as RoleModel[];

  subscriptions = [] as Subscription[];
  connectedUser = new UtilisateurModel();

  constructor(
    private UtilisateurServices: UtilisateurService
   
  ){}

  getUtilisateur() {
    this.subscriptions.push(
      this.UtilisateurServices.getUsers().subscribe(
        (data: any) => {
          // Assurez-vous que la structure des données correspond à ce que vous attendez
          // Si les utilisateurs sont directement dans 'data', vous pouvez faire comme ceci :
          this.users = data;
          console.log(this.users)  
          // Créez un tableau pour stocker tous les rôles
         /* this.roles = [];
  
          // Parcourez chaque utilisateur et ajoutez ses rôles à la liste globale
          this.users.forEach((user: any) => {
            if (user.roles && user.roles.length > 0) {
              this.roles.push(user.roles);
            }
          });*/
        },
        (error) => {
          console.error('Erreur lors de la récupération des utilisateurs :', error);
        }
      )
    );
  }
  

}
