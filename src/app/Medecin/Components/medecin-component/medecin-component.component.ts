import { Component } from '@angular/core';
import { ProfilMedecinComponent } from '../profil-medecin/profil-medecin.component';
@Component({
  selector: 'app-medecin-component',
  templateUrl: './medecin-component.component.html',
  styleUrls: ['./medecin-component.component.css']
})
export class MedecinComponentComponent {

  //listeDeMedecins= any[]; 
  listeDeMedecin: any[] | undefined;// Liste de médecins
  medecinSelectionne: any;

  onMedecinSelectionne(medecin: any){
     this.medecinSelectionne = medecin;
  }

}
