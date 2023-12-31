import { Pipe, PipeTransform } from '@angular/core';
import { CentreHospitalier } from '../shared/Model/CentreHospitalier';
import { Adresse } from '../shared/Model/Adresse';

@Pipe({
  name: 'searchCH'
})
export class SearchCHPipe implements PipeTransform {

  transform(centreHospitalier: CentreHospitalier[], searchChText: string): any[] {
    if(!centreHospitalier || !searchChText){
      return centreHospitalier;
    }

    const searchCHLower= searchChText.trim().toLowerCase();

    return centreHospitalier.filter(centreHospitalier => {  
      const fulladresse = `${centreHospitalier.adresse?.region} ${centreHospitalier.adresse?.ville} ${centreHospitalier.adresse?.departement} ${centreHospitalier.adresse?.nomRue}`.toLowerCase();
      return (
          (fulladresse.includes(searchCHLower)) ||
          (centreHospitalier.email_ch?.toLowerCase().includes(searchCHLower)) ||  
          (centreHospitalier.nom_Ch?.toLowerCase().includes(searchCHLower)) ||   
          (centreHospitalier.telephone?.toLowerCase().includes(searchCHLower))
      );
  });
  
    
  }

  


}
