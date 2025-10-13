import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MissionComponent } from './component/mission/mission.component';
import { RouterModule } from '@angular/router';
import { AjoutMissionComponent } from './component/ajout-mission/ajout-mission.component';
import { EditMissionComponent } from './component/edit-mission/edit-mission.component';
import { ProfilMissionComponent } from './component/profil-mission/profil-mission.component';



@NgModule({
 
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: MissionComponent
      },
      {
        path: 'ajout',
        component: AjoutMissionComponent
      },
      {
        path: 'edit/:id',
        component: EditMissionComponent
      },
      {
        path: 'profil/:id',
        component: ProfilMissionComponent
      },
      // Anciens chemins maintenus pour la rétrocompatibilité
      {
        path: 'list-mission',
        redirectTo: ''
      },
      {
        path: 'Ajout-mission',
        redirectTo: 'ajout'
      }
    ])
    
  ],
  exports: [RouterModule]
})
export class MissionRountingModule { }
