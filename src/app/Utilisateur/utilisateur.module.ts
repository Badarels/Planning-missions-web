import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AjouterUtilisateurComponent } from './Components/ajouter-utilisateur/ajouter-utilisateur.component';
import { UtilisateurRoutingModule } from './utilisateur-routing.module';
import { ListeUtilisateurComponent } from './Components/liste-utilisateur/liste-utilisateur.component';



@NgModule({
  declarations: [
    AjouterUtilisateurComponent,
    ListeUtilisateurComponent
  ],
  imports: [
    SharedModule,
    UtilisateurRoutingModule
  ]
})
export class UtilisateurModule { 

  
}
