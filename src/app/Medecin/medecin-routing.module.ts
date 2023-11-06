import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListeMedecinComponent } from './Components/liste-medecin/liste-medecin.component';
import { AjoutMedecinComponent } from './Components/ajout-medecin/ajout-medecin.component';
import { ProfilMedecinComponent } from './Components/profil-medecin/profil-medecin.component';




@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'Ajout-medecin',
        component: AjoutMedecinComponent,
      },
      {
        path: 'list-medecin',
        component: ListeMedecinComponent,
        
      },
      {
        path: 'profil-medecin/:id',
        component: ProfilMedecinComponent
      }
    ])
  ],
  exports: [RouterModule]
})
export class MedecinRoutingModule { }
