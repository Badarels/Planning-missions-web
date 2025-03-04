import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedecinRoutingModule } from './medecin-routing.module';
import { AjoutMedecinComponent } from './Components/ajout-medecin/ajout-medecin.component';
import { ListeMedecinComponent } from './Components/liste-medecin/liste-medecin.component';
import { SharedModule } from '../shared/shared.module';
import { ProfilMedecinComponent } from './Components/profil-medecin/profil-medecin.component';
import { SearchPipe } from '../pipe/search.pipe';
import { SearchAdressePipe } from '../pipe/search-adresse.pipe';



@NgModule({
  declarations: [
    AjoutMedecinComponent,
    ListeMedecinComponent,
    ProfilMedecinComponent,
    SearchPipe,
    SearchAdressePipe,
  ],
  imports: [
    SharedModule,
    MedecinRoutingModule,
    CommonModule
    
  ]
})
export class MedecinModule { }
