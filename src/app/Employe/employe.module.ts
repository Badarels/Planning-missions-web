import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeComponent } from './Component/employe/employe.component';
import { AjoutEmployeComponent } from './Component/ajout-employe/ajout-employe.component';
import { EditEmployeComponent } from './Component/edit-employe/edit-employe.component';
import { EmployeRoutingModule } from './employe-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EmployePipe } from '../pipe/employe.pipe';
import { ProfilEmployeComponent } from './Component/profil-employe/profil-employe.component';




@NgModule({
  declarations: [
    EmployeComponent,
    AjoutEmployeComponent,
    EditEmployeComponent,
    ProfilEmployeComponent,
    EmployePipe
  ],
  imports: [
    CommonModule,
    SharedModule,
    EmployeRoutingModule,
    NgbDropdownModule,
    NgbModule
  ]
})
export class EmployeModule { }
