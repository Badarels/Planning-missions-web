import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedecinRoutingModule } from './medecin-routing.module';
import { AjoutMedecinComponent } from './Components/ajout-medecin/ajout-medecin.component';
import { ListeMedecinComponent } from './Components/liste-medecin/liste-medecin.component';
import { SharedModule } from '../shared/shared.module';
import { ProfilMedecinComponent } from './Components/profil-medecin/profil-medecin.component';



@NgModule({
  declarations: [
    AjoutMedecinComponent,
    ListeMedecinComponent,
    ProfilMedecinComponent
  ],
  imports: [
    SharedModule,
    MedecinRoutingModule
  ]
})
export class MedecinModule { }
