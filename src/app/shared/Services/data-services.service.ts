import { Injectable } from '@angular/core';
import { Medecin } from '../Model/Medecin';

@Injectable({
  providedIn: 'root'
})
export class DataServicesService {

  selectedIdMedecin:any;

  setSelectedIdMedecin(medecinId: number) {
    this.selectedIdMedecin = medecinId;
  }

  getSelectedIdMedecin() {
    return this.selectedIdMedecin;
  }
}
