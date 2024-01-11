import { Component, OnInit, ViewChild } from '@angular/core';
import { Medecin } from 'src/app/shared/Model/Medecin';
import { MedecinService } from '../../Services/medecin.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Adresse } from 'src/app/shared/Model/Adresse';
import { Subscription } from 'rxjs';
import { AdresseService } from 'src/app/Adresses/Services/adresse.service';
import { Specialite } from 'src/app/shared/Model/Specialite';
import { forkJoin } from 'rxjs';
import { MedecinSpecialite } from 'src/app/shared/Model/MedecinSpecialite';


@Component({
  selector: 'app-ajout-medecin',
  templateUrl: './ajout-medecin.component.html',
  styleUrls: ['./ajout-medecin.component.css']
})
export class AjoutMedecinComponent implements OnInit{

  @ViewChild('dropdown') dropdown: any;
  medecin= new  Medecin();
  adresse=new Adresse();
  medecinForm!: FormGroup;
  adresseForm!: FormGroup;
  Specialite: Specialite[] = [];
  adresses: Adresse[] = [];
  searchText: string = '';
  selectedAddress: any; 
  submitted: boolean= false;
  adresseSelectionnee: any = null;  // Stocke l'adresse sélectionnée
  specialiteSelectionnee: Specialite | null = null;
  specialitesSelectionnees: Specialite[] = [];
  showDropdown: boolean = false;
  

 
  subscriptions = [] as Subscription[];

  afficherFormulaireAdresse: boolean = false;


  constructor(private medecinservices: MedecinService, private adresseServices: AdresseService){}

  getSpecialite() {
    this.medecinservices.getSpecialite()
      .subscribe(
        (specialite: any) => {
          this.Specialite = specialite;
          console.log("specilaite"+this.Specialite);
        },
        (error) => {
          console.error('Une erreur s\'est produite lors de la récupération de la spécialité:', error);
        }
      );
  }
  getAdresse() {
    this.medecinservices.getAdresse() 
      .subscribe(
        (Adresse: any) => {
          this.adresses = Adresse;
          console.log("Adresses"+this.adresses);  
        },
        (error) => {
          console.error('Une erreur s\'est produite lors de la récupération de l\'adresse :', error);       
         }
      );
  }

  // Fonction appelée lorsqu'une adresse est sélectionnée
 /* selectAddress(adresse: any) {
    this.selectedAddress = adresse;
  }*/

  selectAddress(address: any) {
    this.selectedAddress = address;
    this.showDropdown = false; // Masquer la liste déroulante après la sélection
  }
  
  deselectAddress() {
    this.selectedAddress = null;
    this.showDropdown = false; // Ne pas dérouler la liste après la désélection
  }
  
  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

// La fonction pour sélectionner/désélectionner une spécialité
selectSpecialite(specialite: Specialite): void {
  // Vérifiez si la spécialité est déjà sélectionnée
  if (this.specialiteSelectionnee === specialite) {
    // Si oui, désélectionnez en la mettant à null
    this.specialiteSelectionnee = null;
  } else {
    // Sinon, sélectionnez la spécialité
    this.specialiteSelectionnee = specialite;
  }
}

// La fonction pour ajouter ou retirer une spécialité de la liste
toggleSpecialiteSelection(specialite: Specialite): void {
  const index = this.specialitesSelectionnees.indexOf(specialite);
  if (index !== -1) {
    // Si la spécialité est déjà dans la liste, retirez-la
    this.specialitesSelectionnees.splice(index, 1);
  } else {
    // Sinon, ajoutez-la à la liste
    this.specialitesSelectionnees.push(specialite);
  }
}

  onCheckboxChange(specialite: any) {
    if (!specialite.checked) {
      // Si la checkbox est décochée, effacez la spécialité sélectionnée
      this.specialiteSelectionnee = null;
    }
  }
  
  basculerFormulaireAdresse() {
    this.afficherFormulaireAdresse = !this.afficherFormulaireAdresse;
  }

  private initForm(medecin: Medecin, adresse: Adresse){
    if(medecin){
      this.medecinForm=new FormGroup(
        {
          'nomMedecin': new FormControl(medecin?.nomMedecin, [Validators.required]),
          'prenomMedecin': new FormControl(medecin?.prenomMedecin,[Validators.required]),
          'dateNaissanceMedecin': new FormControl(medecin?.dateDeNaissanceMedecin,[Validators.required]),
          'lieuNaissanceMedecin':new FormControl(medecin?.lieuDeNaissanceMedecin,[Validators.required]),
          'numeroRpps':new FormControl(medecin?.numeroRpps, [Validators.required]),
          'emailMedecin': new FormControl(medecin?.emailMedecin, [Validators.required]),
          'numeroSecuriteSocialeMedecin': new FormControl(medecin?.numeroSecuriteSocialeMedecin, [Validators.required]),
          'inscription_A_lordre': new FormControl(medecin?.inscription_A_lordre, [Validators.required]),
          'telephoneMedecin_1': new FormControl(medecin?.telephoneMedecin_1,[Validators.required]),
          'telephoneMedecin_2': new FormControl(medecin?.telephoneMedecin_2,[Validators.required]),
          'sexeMedecin': new FormControl(medecin?.sexeMedecin,[Validators.required]),
          'statutMedecin': new FormControl(medecin?.statutMedecin,[Validators.required]),
          'specialite': new FormControl([],[Validators.required]),

          'nomRue': new FormControl(adresse?.nomRue,[Validators.required]),
          'numeroRue': new FormControl(adresse?.numeroRue,[Validators.required]),
          'complement': new FormControl(adresse?.complement, [Validators.required]),
          'departement': new FormControl(adresse?.departement, [Validators.required]),
          'ville': new FormControl(adresse?.ville, [Validators.required]),
          'region': new FormControl(adresse?.region, [Validators.required]),
          'codePostal': new FormControl(adresse?.codePostal, [Validators.required]),

        }
      );
    }else{
      this.medecinForm=new FormGroup({
        'nomMedecin': new FormControl(null, [Validators.required]),
        'prenomMedecin': new FormControl(null,[Validators.required]),
        'dateNaissanceMedecin': new FormControl(null,[Validators.required]),
        'lieuNaissanceMedecin':new FormControl(null,[Validators.required]),
        'numeroRpps':new FormControl(null, [Validators.required]),
        'emailMedecin': new FormControl(null, [Validators.required]),
        'numeroSecuriteSocialeMedecin': new FormControl(null, [Validators.required]),
        'inscription_A_lordre': new FormControl(null, [Validators.required]),
        'telephoneMedecin_1': new FormControl(null,[Validators.required]),
        'telephoneMedecin_2': new FormControl(null,[Validators.required]),
        'sexeMedecin': new FormControl(null,[Validators.required]),
        'statutMedecin': new FormControl(null,[Validators.required]),
        'specialite': new FormControl(null,[Validators.required]),
        //'date_d'echeance': new FormControl(null, )
        'nomRue': new FormControl(null,[Validators.required]),
        'numeroRue': new FormControl(null,[Validators.required]),
        'complement': new FormControl(null, [Validators.required]),
        'departement': new FormControl(null, [Validators.required]),
        'ville': new FormControl(null, [Validators.required]),
        'region': new FormControl(null, [Validators.required]),
        'codePostal': new FormControl(null, [Validators.required]),

      })
    }
  }
  ngOnInit(): void {
    this.getSpecialite(); 
    this.getAdresse();
    this.initForm(new Medecin(),new Adresse());
  }

  get f(){
    return this.medecinForm.controls;
  }

shouldShowNomRequiredError() {
  const nomMedecin = this.medecinForm.controls['nomMedecin'];
  return nomMedecin.touched && nomMedecin.hasError('required');
}
shouldShowPrenomRequiredError() {
  const prenomMedecin = this.medecinForm.controls['prenomMedecin'];
  return prenomMedecin.touched && prenomMedecin.hasError('required');
}
shouldShowDateNaissanceMedecinRequiredError() {
  const dateNaissanceMedecin = this.medecinForm.controls['dateNaissanceMedecin'];
  return dateNaissanceMedecin.touched && dateNaissanceMedecin.hasError('required');
}
shouldShowLieuNaissanceMedecinRequiredError() {
  const lieuNaissanceMedecin = this.medecinForm.controls['lieuNaissanceMedecin'];
  return lieuNaissanceMedecin.touched && lieuNaissanceMedecin.hasError('required');
}

shouldShowNumeroRppsRequiredError() {
  const numeroRpps = this.medecinForm.controls['numeroRpps'];
  return numeroRpps.touched && numeroRpps.hasError('required');
}
shouldShowEmailMedecinRequiredError() {
  const emailMedecin = this.medecinForm.controls['emailMedecin'];
  return emailMedecin.touched && emailMedecin.hasError('required');
}

shouldShowNumeroSecuriteSocialeMedecinRequiredError() {
  const numeroSecuriteSocialeMedecin = this.medecinForm.controls['numeroSecuriteSocialeMedecin'];
  return numeroSecuriteSocialeMedecin.touched && numeroSecuriteSocialeMedecin.hasError('required');
}

shouldShowinscription_A_lordreRequiredError() {
  const inscription_A_lordre = this.medecinForm.controls['inscription_A_lordre'];
  return inscription_A_lordre.touched && inscription_A_lordre.hasError('required');
}

shouldShowTelephoneMedecin_1RequiredError() {
  const telephoneMedecin_1 = this.medecinForm.controls['telephoneMedecin_1'];
  return telephoneMedecin_1.touched && telephoneMedecin_1.hasError('required');
}
shouldShowTelephoneMedecin_2RequiredError() {
  const telephoneMedecin_2 = this.medecinForm.controls['telephoneMedecin_2'];
  return telephoneMedecin_2.touched && telephoneMedecin_2.hasError('required');
}

shouldShowSexeMedecinRequiredError() {
  const sexeMedecin = this.medecinForm.controls['sexeMedecin'];
  return sexeMedecin.touched && sexeMedecin.hasError('required');
}
shouldShowStatutMedecinRequiredError() {
  const statutMedecin = this.medecinForm.controls['statutMedecin'];
  return statutMedecin.touched && statutMedecin.hasError('required');
}
shouldShowNomRueAdresseRequiredError() {
  const nomRue = this.medecinForm.controls['nomRue'];
  return nomRue.touched && nomRue.hasError('required');
}
shouldShowNumeroRueAdresseRequiredError() {
  const numeroRue = this.medecinForm.controls['numeroRue'];
  return numeroRue.touched && numeroRue.hasError('required');
}
shouldShowComplementAdresseRequiredError() {
  const complement = this.medecinForm.controls['complement'];
  return complement.touched && complement.hasError('required');
}
shouldShowDepartementAdresseRequiredError() {
  const departement = this.medecinForm.controls['departement'];
  return departement.touched && departement.hasError('required');
}
shouldShowVilleAdresseRequiredError() {
  const ville = this.medecinForm.controls['ville'];
  return ville.touched && ville.hasError('required');
}

shouldShowRegionAdresseRequiredError() {
  const  region = this.medecinForm.controls['region'];
  return region.touched && region.hasError('required');
}

shouldShowCodePostalAdresseRequiredError() {
  const  codePostal = this.medecinForm.controls['codePostal'];
  return codePostal.touched && codePostal.hasError('required');
}


onSaveMedecinAndAdresse() {
  if (this.medecinForm.valid) {
    this.submitted = true;
    console.log("Formulaire du médecin valide");

    // Accédez aux données du formulaire, y compris les spécialités
    const formData = this.medecinForm.value;

    // Mettez à jour le champ 'specialites' dans formData avec les spécialités sélectionnées
    formData.specialites = this.specialitesSelectionnees.map(specialite => specialite.id);

    if (this.medecin && this.adresse) {
      // Mettez à jour les propriétés du médecin et de l'adresse
      this.medecin.nomMedecin = formData.nomMedecin;
      this.medecin.prenomMedecin = formData.prenomMedecin;
      this.medecin.dateDeNaissanceMedecin = formData.dateDeNaissanceMedecin;
      this.medecin.emailMedecin = formData.emailMedecin;
      this.medecin.numeroRpps = formData.numeroRpps;
      this.medecin.inscription_A_lordre = formData.inscription_A_lordre;
      this.medecin.sexeMedecin = formData.sexeMedecin;
      this.medecin.numeroSecuriteSocialeMedecin = formData.numeroSecuriteSocialeMedecin;
      this.medecin.statutMedecin = formData.statutMedecin;
      this.medecin.inscription_A_lordre=formData.inscription_A_lordre;
      this.medecin.lieuDeNaissanceMedecin=formData.lieuDeNaissanceMedecin;
      this.medecin.telephoneMedecin_1=formData.telephoneMedecin_1;
      this.medecin.telephoneMedecin_2=formData.telephoneMedecin_2;
      this.adresse.codePostal=formData.codePostal;
      this.adresse.complement=formData.complement;
      this.adresse.nomRue=formData.nomRue;
      this.adresse.departement=formData.departement;
      this.adresse.numeroRue=formData.numeroRue;
      this.adresse.region=formData.region;
      this.adresse.ville=formData.ville;
      this.medecin.adresse=formData.adresse;
      this.medecin.specialites=formData.specialite;

      const medecinObservable = this.medecinservices.ajoutMedecin(this.medecin);
      const adresseObservable = this.adresseServices.ajoutAdresse(this.adresse);

      const combinedObservables = forkJoin([medecinObservable, adresseObservable]);

      this.subscriptions.push(
        combinedObservables.subscribe(
          ([medecinResponse, adresseResponse]) => {
            console.log('Médecin ajouté ou mis à jour avec succès:', medecinResponse);
            console.log('Adresse ajoutée ou mise à jour avec succès:', adresseResponse);

            // Réinitialiser les formulaires après la soumission
            this.medecinForm.reset();
            this.specialitesSelectionnees = []; // Réinitialiser la liste des spécialités sélectionnées
          },
          (error: any) => {
            console.error('Erreur lors de l\'ajout ou de la mise à jour :', error);
            // Gérer l'erreur de manière appropriée (afficher un message d'erreur, etc.)
          }
        )
      );
    }
  }
}
 
onSaveMedecinAndAdresses(){
  if(this.medecinForm.valid){
    this.submitted=true;
    console.log("medcinForm valide");
    const formData = this.medecinForm.value;
    if (this.medecin && this.adresse) {
      console.log("medecin et adresse chargés");
      // Mettez à jour les propriétés du médecin et de l'adresse
      this.medecin.nomMedecin = formData.nomMedecin;
      this.medecin.prenomMedecin = formData.prenomMedecin;
      this.medecin.dateDeNaissanceMedecin = formData.dateDeNaissanceMedecin;
      this.medecin.emailMedecin = formData.emailMedecin;
      this.medecin.numeroRpps = formData.numeroRpps;
      this.medecin.inscription_A_lordre = formData.inscription_A_lordre;
      this.medecin.sexeMedecin = formData.sexeMedecin;
      this.medecin.numeroSecuriteSocialeMedecin = formData.numeroSecuriteSocialeMedecin;
      this.medecin.statutMedecin = formData.statutMedecin;
      this.medecin.inscription_A_lordre=formData.inscription_A_lordre;
      this.medecin.lieuDeNaissanceMedecin=formData.lieuDeNaissanceMedecin;
      this.medecin.telephoneMedecin_1=formData.telephoneMedecin_1;
      this.medecin.telephoneMedecin_2=formData.telephoneMedecin_2;
      this.adresse.codePostal=formData.codePostal;
      this.adresse.complement=formData.complement;
      this.adresse.nomRue=formData.nomRue;
      this.adresse.departement=formData.departement;
      this.adresse.numeroRue=formData.numeroRue;
      this.adresse.region=formData.region;
      this.adresse.ville=formData.ville;
      this.medecin.adresse=formData.adresse;
      this.medecin.specialites=formData.specialite;

   
     // const medecinObservable = this.medecinservices.ajoutMedecin(JSON.stringify(this.medecin), httpOptions);

      const medecinObservable = this.medecinservices.ajoutMedecin(this.medecin);
      const adresseObservable = this.adresseServices.ajoutAdresse(this.adresse);
     // const medecinSpecialite=this.medecinservices.ajoutMedecinSpecialite(this.medcinspecialite);
      

      const combinedObservables = forkJoin([medecinObservable, adresseObservable]);

      this.subscriptions.push(
        combinedObservables.subscribe(
          ([medecinResponse, adresseResponse]) => {
            console.log('Médecin ajouté ou mis à jour avec succès:', medecinResponse);
            console.log('Adresse ajoutée ou mise à jour avec succès:', adresseResponse);

            // Réinitialiser les formulaires après la soumission
            this.medecinForm.reset();
          },
          (error: any) => {
            console.error('Erreur lors de l\'ajout ou de la mise à jour :', error);
            // Gérer l'erreur de manière appropriée (afficher un message d'erreur, etc.)
          }
        )
      );
    }
  }
}



/*SaveMedecinAndAdresse() {
  if (this.medecinForm.valid) {
    const formData = this.medecinForm.value;

    if (this.medecin && this.adresse) {
      // ... (code existant)

      console.log("medecin et adresse chargés");
      // Mettez à jour les propriétés du médecin et de l'adresse
      this.medecin.nomMedecin = formData.nomMedecin;
      this.medecin.prenomMedecin = formData.prenomMedecin;
      this.medecin.dateDeNaissanceMedecin = formData.dateDeNaissanceMedecin;
      this.medecin.emailMedecin = formData.emailMedecin;
      this.medecin.numeroRpps = formData.numeroRpps;
      this.medecin.inscription_A_lordre = formData.inscription_A_lordre;
      this.medecin.sexeMedecin = formData.sexeMedecin;
      this.medecin.numeroSecuriteSocialeMedecin = formData.numeroSecuriteSocialeMedecin;
      this.medecin.statutMedecin = formData.statutMedecin;
      this.medecin.inscription_A_lordre=formData.inscription_A_lordre;
      this.medecin.lieuDeNaissanceMedecin=formData.lieuDeNaissanceMedecin;
      this.medecin.telephoneMedecin_1=formData.telephoneMedecin_1;
      this.medecin.telephoneMedecin_2=formData.telephoneMedecin_2;
      this.adresse.codePostal=formData.codePostal;
      this.adresse.complement=formData.complement;
      this.adresse.nomRue=formData.nomRue;
      this.adresse.departement=formData.departement;
      this.adresse.numeroRue=formData.numeroRue;
      this.adresse.region=formData.region;
      this.adresse.ville=formData.ville;
      this.medecin.adresse=formData.adresse;
      this.medecin.specialites=formData.specialite;

      const medecinObservable = this.medecinservices.ajoutMedecin(this.medecin);
      const adresseObservable = this.adresseServices.ajoutAdresse(this.adresse);

      forkJoin([medecinObservable, adresseObservable]).subscribe(
        ([medecinResponse, adresseResponse]) => {
          console.log('Médecin ajouté ou mis à jour avec succès:', medecinResponse);
          console.log('Adresse ajoutée ou mise à jour avec succès:', adresseResponse);

          // Enregistrement dans la table d'association medecin_specialite
          const medecinId = medecinResponse.id; // Assurez-vous que votre service retourne l'ID du médecin
          const specialiteId = formData.specialite.id; // Assurez-vous que votre formulaire contient un champ spécialité

          const medecinSpecialite: MedecinSpecialite = {
            medecinId: medecinId,
            specialiteId: specialiteId
          };

          // Appelez le service pour enregistrer dans la table d'association
        /*  this.medecinservices.ajoutMedecinSpecialite(medecinSpecialite).subscribe(
            (medecinSpecialiteResponse) => {
              console.log('Association medecin_specialite ajoutée avec succès:', medecinSpecialiteResponse);

              // Réinitialiser les formulaires après la soumission
              this.medecinForm.reset();
            },
            (error: any) => {
              console.error('Erreur lors de l\'ajout de l\'association medecin_specialite:', error);
              // Gérer l'erreur de manière appropriée (afficher un message d'erreur, etc.)
            }
          );
        },
        (error: any) => {
          console.error('Erreur lors de l\'ajout ou de la mise à jour :', error);
          // Gérer l'erreur de manière appropriée (afficher un message d'erreur, etc.)
        }
      );
    }
  }
}*/


// ...

// Dans ngOnDestroy ou là où vous nettoyez vos abonnements
ngOnDestroy() {
  this.subscriptions.forEach(sub => sub.unsubscribe());
}

} 



