import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Adresse } from 'src/app/shared/Model/Adresse';
import { Medecin } from 'src/app/shared/Model/Medecin';
import { MedecinService } from '../../Services/medecin.service';
import { Subscription } from 'rxjs';
import { DataServicesService } from 'src/app/shared/Services/data-services.service';
import { Specialite } from 'src/app/shared/Model/Specialite';

@Component({
  selector: 'app-liste-medecin',
  templateUrl: './liste-medecin.component.html',
  styleUrls: ['./liste-medecin.component.css']
})
export class ListeMedecinComponent implements OnInit {



  //@Output() medecinSelectionne = new EventEmitter<any>();

  ngOnInit(): void {
    this.getMedecin();
    //this.getSpecialite
  }
  Medecin=[] as Medecin[];
  medecin=new  Medecin;
  Adresse=[] as Adresse[]; 
  specialite: any;
  medecinId:number=0;

  subscriptions = [] as Subscription[];
 
constructor(private medecinServices: MedecinService){
  
}
getMedecin() {
  this.subscriptions.push(
    this.medecinServices.getMedecin().subscribe(
      (medecin: any) => {
        this.Medecin = medecin;
      },
      (error) => {
        console.error('Erreur lors de la récupération du médecin :', error);
      }
    )
  );
}

getSpecialite(medecinId: number){
  this.medecinServices.getSpecialiteByMedecin(medecinId)
    .subscribe((specialite: any) => {
      this.specialite = specialite; 
    });
}

ngOnDestroy() {
  //this.subscriptions.forEach((subscription) => subscription.unsubscribe());
}

}
