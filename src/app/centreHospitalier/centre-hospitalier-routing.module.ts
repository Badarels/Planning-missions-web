import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListeCentreHospitalierComponent } from './Component/liste-centre-hospitalier/liste-centre-hospitalier.component';

import { RouterModule } from '@angular/router';
import { AjoutCentreHospitalierComponent } from './Component/ajout-centre-hospitalier/ajout-centre-hospitalier.component';
import { EditCentreHospitalierComponent } from './Component/edit-centre-hospitalier/edit-centre-hospitalier.component';



@NgModule({

imports: [
  RouterModule.forChild([
    {
      path: 'Ajout-CentreHospitalier',
      component: AjoutCentreHospitalierComponent
    },
    {
      path: 'list-CentreHospitalier',
      component: ListeCentreHospitalierComponent
    },  
    {
      path: 'edit-CentreHospitalier/:id',
      component: EditCentreHospitalierComponent
    },
  ])
],
exports: [RouterModule]
})
export class CentreHospitalierRoutingModule {}
