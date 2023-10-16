import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AjouterUtilisateurComponent } from './Components/ajouter-utilisateur/ajouter-utilisateur.component';
import { ListeUtilisateurComponent } from './Components/liste-utilisateur/liste-utilisateur.component';



@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'Ajout-Utilisateur',
        component: AjouterUtilisateurComponent,
      },
      {
        path: 'list-utilisateur',
        component: ListeUtilisateurComponent,
        
      }
    ])
    
  ],
  exports: [RouterModule]
})
export class UtilisateurRoutingModule { }
