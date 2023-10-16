import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainContaintsComponent } from './main-containts/main-containts.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    MainContaintsComponent
  ],
  exports:[MainContaintsComponent],
  imports: [
    SharedModule
  ]
})
export class LayoutsModule { }
