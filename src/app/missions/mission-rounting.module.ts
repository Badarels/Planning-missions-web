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
        path: 'Ajout-mission',
        component: AjoutMissionComponent,
      },
      {
        path: 'edit-mission/:id',
        component: EditMissionComponent,
      },
      {
        path: 'list-mission',
        component: MissionComponent,
        
      },
      {
        path: 'profil-mission/:id',
        component: ProfilMissionComponent,
        
      }
    ])
    
  ],
  exports: [RouterModule]
})
export class MissionRountingModule { }
