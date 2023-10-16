import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListeMedecinComponent } from './Components/liste-medecin/liste-medecin.component';
import { AjoutMedecinComponent } from './Components/ajout-medecin/ajout-medecin.component';




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
        
      }
    ])
  ],
  exports: [RouterModule]
})
export class MedecinRoutingModule { }
