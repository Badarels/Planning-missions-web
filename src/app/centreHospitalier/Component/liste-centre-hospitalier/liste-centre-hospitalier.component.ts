import { Component, OnInit } from '@angular/core';
import { DataTable } from 'simple-datatables';
import { CentreHospitalier } from 'src/app/shared/Model/CentreHospitalier';
import { CentreHospitalierService } from '../../Services/centre-hospitalier.service';
import { Subscription } from 'rxjs';
import { error } from 'toastr';

@Component({
  selector: 'app-liste-centre-hospitalier',
  templateUrl: './liste-centre-hospitalier.component.html',
  styleUrls: ['./liste-centre-hospitalier.component.css']
})
export class ListeCentreHospitalierComponent implements OnInit{
  
  centreHospitalier!: CentreHospitalier;
  centreHospitaliers = [] as CentreHospitalier[];
  subscription: Subscription[] = [];
  filteText: string = '';

  constructor (private centreHospitalierservces: CentreHospitalierService){}

  ngOnInit(): void {
    this.getCentreHospitalier()
  }

  getCentreHospitalier(){
    this.subscription.push(
    this.centreHospitalierservces.getCh().subscribe(
        (data: CentreHospitalier[])=>{
          this.centreHospitaliers=data;
        },
        (error)=>{
          return console.error('Erreur lors de la récupération des adresses', error);
        }
      )
    );
  }

  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

}
