import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CentreHospitalierRoutingModule } from './centre-hospitalier-routing.module';
import { ListeCentreHospitalierComponent } from './Component/liste-centre-hospitalier/liste-centre-hospitalier.component';
import { SearchCHPipe } from '../pipe/search-ch.pipe';
import { AjoutCentreHospitalierComponent } from './Component/ajout-centre-hospitalier/ajout-centre-hospitalier.component';



@NgModule({
  declarations: [
   ListeCentreHospitalierComponent,
   AjoutCentreHospitalierComponent,
   SearchCHPipe
  ],
  imports: [
    SharedModule,
    CentreHospitalierRoutingModule,
  ]
})
export class CentreHospitalierModule { }
