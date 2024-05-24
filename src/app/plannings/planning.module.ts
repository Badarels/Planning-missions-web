import { NgModule } from '@angular/core';
import { MissionPipe } from '../pipe/mission.pipe';
import { SharedModule } from '../shared/shared.module';
import { MissionRountingModule } from '../missions/mission-rounting.module';
import { PlanningRoutingModule } from './planning-routing.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { PlanningComponent } from './Component/planning/planning.component';
import { MissionModule } from '../missions/mission.module';


@NgModule({
  declarations: [ 
    PlanningComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MissionRountingModule,
    NgbDropdownModule,
    NgbModalModule,
    PlanningRoutingModule,
    FormsModule,
    MissionModule

  ]
})
export class PlanningModule { }
