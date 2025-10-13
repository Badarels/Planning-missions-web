import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Employe } from 'src/app/shared/Model/Employe';
import { EmployeService } from '../../Services/employe.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profil-employe',
  templateUrl: './profil-employe.component.html',
  styleUrl: './profil-employe.component.css'
})
export class ProfilEmployeComponent {
  employe?: Employe;
  subcription= [] as  Subscription[];
  employeId:number=0;
 
  constructor(private employeservices: EmployeService , private route:  ActivatedRoute){}
 
  ngOnInit(): void {
   this.route.params.subscribe(params => {
       this.employeId = +params['id']; // Convertir l'ID en nombre
       this.getemployeById();
     });
     console.log('ID Utlisateur récupéré dans Oninit:',this.employeId)
   }
 
   getemployeById(){
     this.employeservices.getEmpById(this.employeId).subscribe(
         (data: Employe)=>{
           this.employe=data;
         },
         (error)=>{
           console.log("Erreur lors de la récupération de l\' employé", error)
         }
         );
     }
    
  }
 

