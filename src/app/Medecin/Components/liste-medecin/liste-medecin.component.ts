import { Component } from '@angular/core';
import { Adresse } from 'src/app/shared/Model/Adresse';
import { Medecin } from 'src/app/shared/Model/Medecin';
import { MedecinService } from '../../Services/medecin.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-liste-medecin',
  templateUrl: './liste-medecin.component.html',
  styleUrls: ['./liste-medecin.component.css']
})
export class ListeMedecinComponent {

  Medecin=[] as Medecin[];
  Adresse=[] as Adresse[];


  subscriptions = [] as Subscription[];

constructor(private medecinServices: MedecinService){

}
  listeMedecin(){
   this.subscriptions.push(
    this.medecinServices.getMedecin().subscribe(
      (data: any) => {
        this.Medecin=data;
      },
      (error)=>{
        console.error('Erreur lors de la récupération des utilisateurs :', error)
      }
      )
    );
  }
  
}
