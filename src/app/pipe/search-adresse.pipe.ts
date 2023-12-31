import { Pipe, PipeTransform } from '@angular/core';
import { Adresse } from '../shared/Model/Adresse';

@Pipe({
  name: 'searchAdresse'
})
export class SearchAdressePipe implements PipeTransform {

  transform(adresses: Adresse[], searchText: string): any[] {
    if (!adresses || !searchText){
      return adresses;
    }
  
    const searchTextLower = searchText.trim().toLowerCase();

    return adresses.filter(adresse => {
      const fullAdresse = ` ${adresse?.ville} ${adresse?.departement} ${adresse?.nomRue} ${adresse?.numeroRue} `.toLowerCase();
      return fullAdresse.includes(searchTextLower);
    });
  }    

}
