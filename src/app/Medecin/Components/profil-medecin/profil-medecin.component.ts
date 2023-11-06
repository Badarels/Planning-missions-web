import { Component, Input, OnInit, Output } from '@angular/core';
import { Adresse } from 'src/app/shared/Model/Adresse';
import { Medecin } from 'src/app/shared/Model/Medecin';
import { MedecinService } from '../../Services/medecin.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServicesService } from 'src/app/shared/Services/data-services.service';
import { Specialite } from 'src/app/shared/Model/Specialite';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

@Component({
  selector: 'app-profil-medecin',
  templateUrl: './profil-medecin.component.html',
  styleUrls: ['./profil-medecin.component.css']
})
export class ProfilMedecinComponent implements OnInit{
  
  medecinId: number=0;
  medecin:any;

 
  Specialite=[] as Specialite[];
  subscription= [] as Subscription[];

constructor(private route: ActivatedRoute,private router: Router,private dataService: DataServicesService, private medecinServices: MedecinService){
 
}

getMedecin(){
  this.medecinServices.getMedecinById(this.medecinId)
  .subscribe((data: Medecin) => {
    this.medecin = data;
    console.log('ID Médecin récupéré dans Oninit:', this.medecin.id);
  }, (error) => console.log(error));
}

ngOnInit(): void {
  this.route.params.subscribe(params => {
    this.medecinId = +params['id']; // Convertir l'ID en nombre
    this.getMedecin();
  });
  console.log('ID Médecin récupéré dans Oninit:',this.medecinId )

}
 
}
