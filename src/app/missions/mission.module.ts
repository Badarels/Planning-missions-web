import { NgModule } from '@angular/core';
import { MissionComponent } from './component/mission/mission.component';
import { AjoutMissionComponent } from './component/ajout-mission/ajout-mission.component';
import { MissionRountingModule } from './mission-rounting.module';
import { SharedModule } from '../shared/shared.module';
import { NgbDropdownModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { MissionPipe } from '../pipe/mission.pipe';
import { EditMissionComponent } from './component/edit-mission/edit-mission.component';
import { ProfilMissionComponent } from './component/profil-mission/profil-mission.component';
import { CommonModule } from '@angular/common';




@NgModule({
  declarations: [
    MissionComponent,
    AjoutMissionComponent,
    EditMissionComponent,
    ProfilMissionComponent,
    
  ],
  imports: [
    CommonModule,
    SharedModule,
    MissionRountingModule,
    NgbDropdownModule,
    NgbModalModule,
   

  ]
})
export class MissionModule { }
