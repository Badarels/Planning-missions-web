import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTable } from 'simple-datatables';
import { CentreHospitalier } from 'src/app/shared/Model/CentreHospitalier';
import { CentreHospitalierService } from '../../Services/centre-hospitalier.service';
import { Subscription } from 'rxjs';
import { MatMenuTrigger } from '@angular/material/menu';

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
  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;

  isDropdownOpen = false;


  constructor (private centreHospitalierservces: CentreHospitalierService){}

  ngOnInit(): void {
    this.getCentreHospitalier()
  }

  supprimerCentreHospitalier(id: number): void {
    // Appeler la méthode du service pour archiver le Centre Hospitalier
    this.centreHospitalierservces.archiveCentreHospitalier(id).subscribe(
      (archivedCentreHospitalier) => {
        // Effectuez d'autres actions si nécessaire
        console.log('Centre Hospitalier archivé avec succès', archivedCentreHospitalier);
        
        // Ajustez la valeur de l'archive à 1 si elle est true, sinon à 0
        archivedCentreHospitalier.archived = (archivedCentreHospitalier.archived ?? true) ? 1 : 0;  
        // Mise à jour de la page
        window.location.reload();
      },
      (error) => {
        // Gérer les erreurs
        console.error('Erreur lors de l\'archivage du Centre Hospitalier', error);
      }
    );
  }
  


  getCentreHospitalier(){
    this.subscription.push(
    this.centreHospitalierservces.getCh().subscribe(
        (data: CentreHospitalier[])=>{
          this.centreHospitaliers = data.filter(ch => ch.archived == 0);
        },
        (error)=>{
          return console.error('Erreur lors de la récupération des Ch', error);
        }
      )
    );
  }

 
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  modifier() {
    // Logique pour l'action "Modifier"
    console.log('Modifier cliqué');
  }

  supprimer() {
    // Logique pour l'action "Supprimer"
    console.log('Supprimer cliqué');
  }

  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

}
