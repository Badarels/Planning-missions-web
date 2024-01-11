import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CentreHospitalier } from 'src/app/shared/Model/CentreHospitalier';
import { CentreHospitalierService } from '../../Services/centre-hospitalier.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { error } from 'toastr';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Adresse } from 'src/app/shared/Model/Adresse';
import { AdresseService } from 'src/app/Adresses/Services/adresse.service';

@Component({
  selector: 'app-edit-centre-hospitalier',
  templateUrl: './edit-centre-hospitalier.component.html',
  styleUrls: ['./edit-centre-hospitalier.component.css']
})
export class EditCentreHospitalierComponent implements OnInit{

chForm!: FormGroup;
centrehospitalier!: CentreHospitalier;
chId!: number;
subscription: Subscription[] = [];

constructor(
  private formBuilder: FormBuilder,
  private centreHospitalierServices: CentreHospitalierService,
  private route: ActivatedRoute,
  private adresseServices: AdresseService
) {}

ngOnInit(): void {
  this.route.params.subscribe(params => {
    this.chId = +params['id']; 
  });
  // Initialiser le formulaire
  this.chForm = this.formBuilder.group({
    nom_ch: ['', Validators.required],
    email_ch: ['', [Validators.required, Validators.email]],
    telephone: ['', Validators.required],
    siret: ['', Validators.required],
    region: ['', Validators.required],
    ville: ['', Validators.required],
    nomRue: ['', Validators.required],
    numero_Rue: ['', Validators.required],
    departement: ['', Validators.required],
    complement: ['', Validators.required],
    codePostal: ['', Validators.required],
    // ... autres champs du formulaire
  });

  // Charger les données du centre hospitalier à éditer
  this.loadCentreHospitalier();
}

ngOnDestroy(): void {
  // Désabonner toutes les subscriptions pour éviter les fuites de mémoire
  this.subscription.forEach(sub => sub.unsubscribe());
}

loadCentreHospitalier(): void {
  // Charger les données du centre hospitalier à éditer en fonction de l'ID
 // this.chId = 1; // Remplacez par la logique pour obtenir l'ID à partir de votre route ou de toute autre source
  this.subscription.push(
    this.centreHospitalierServices.getChById(this.chId).subscribe(
      (centreHospitalier: CentreHospitalier) => {
        this.centrehospitalier = centreHospitalier;
        // Remplir le formulaire avec les données existantes
        this.chForm.patchValue({
          nom_ch: centreHospitalier.nom_ch,
          email_ch: centreHospitalier.email_ch,
          telephone: centreHospitalier.telephone,
          siret: centreHospitalier.siret,
          region: centreHospitalier.adresse?.region,
          departement: centreHospitalier.adresse?.departement,
          ville: centreHospitalier.adresse?.ville,
          nomRue: centreHospitalier.adresse?.nomRue,
          numero_Rue: centreHospitalier.adresse?.numeroRue,
          complement: centreHospitalier.adresse?.complement,
          codePostal: centreHospitalier.adresse?.codePostal,
          // ... autres champs du formulaire
        });
      },
      (error) => {
        console.error('Erreur lors du chargement du centre hospitalier', error);
        // Gérer l'erreur selon vos besoins
      }
    )
  );
}
onEditCh(): void {
  if (this.chForm.valid) {
    const formData = this.chForm.value;
    if (this.centrehospitalier) {
      const adresseActuelle = this.centrehospitalier.adresse;
      const adresseModifiee = this.isAdresseModifiee(formData, adresseActuelle);

      if (adresseModifiee) {
        this.ajouterEtMettreAJour(formData);
      } else {
        this.mettreAJourCentreHospitalier(formData);
      }
    }
  }
}

private isAdresseModifiee(formData: any, adresseActuelle: Adresse | undefined): boolean {
  return (
    adresseActuelle?.region !== formData.region ||
    adresseActuelle?.codePostal !== formData.codePostal ||
    adresseActuelle?.complement !== formData.complement ||
    adresseActuelle?.ville !== formData.ville ||
    adresseActuelle?.nomRue !== formData.nomRue ||
    adresseActuelle?.numeroRue !== formData.numero_Rue
  );
}

private ajouterEtMettreAJour(formData: any): void {
  const nouvelleAdresse: Adresse = {
    region: formData.region,
    codePostal: formData.codePostal,
    complement: formData.complement,
    ville: formData.ville,
    nomRue: formData.nomRue,
    numeroRue: formData.numero_Rue,
    id: undefined,
    departement: formData.departement,
  };

  const adresseObservable = this.adresseServices.ajoutAdresse(nouvelleAdresse);

  this.subscription.push(
    adresseObservable.subscribe(
      (nouvelleAdresseAjoutee: Adresse) => {
        if (this.centrehospitalier.adresse) {
          this.centrehospitalier.adresse.id = nouvelleAdresseAjoutee.id;
        }
        this.mettreAJourCentreHospitalier(formData);
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de la nouvelle adresse', error);
        // Gérer l'erreur selon vos besoins
      }
    )
  );
}


private mettreAJourCentreHospitalier(formData: any): void {
  this.centrehospitalier.nom_ch = formData.nom_ch;
  this.centrehospitalier.email_ch = formData.email_ch;
  this.centrehospitalier.telephone = formData.telephone;
  this.centrehospitalier.siret = formData.siret;

  const chObservable = this.centreHospitalierServices.editCh(this.chId, this.centrehospitalier);

  this.subscription.push(
    chObservable.subscribe(
      (updatedCentreHospitalier: CentreHospitalier) => {
        console.log('Mise à jour réussie', updatedCentreHospitalier);
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du centre hospitalier', error);
        // Gérer l'erreur selon vos besoins
      }
    )
  );
}

/*onEditCh(): void {
  if (this.chForm.valid) {
    const formData = this.chForm.value;
    if (this.centrehospitalier) {
      // Vérifier si l'adresse a été modifiée
      const adresseModifiee = (
        this.centrehospitalier.adresse?.region !== formData.region ||
        this.centrehospitalier.adresse?.codePostal !== formData.codePostal ||
        this.centrehospitalier.adresse?.complement !== formData.complement ||
        this.centrehospitalier.adresse?.ville !== formData.ville ||
        this.centrehospitalier.adresse?.nomRue !== formData.nomRue ||
        this.centrehospitalier.adresse?.numeroRue !== formData.numero_Rue
      );

      if (adresseModifiee) {
        // Créer une nouvelle adresse dans la table Adresse
        const nouvelleAdresse: Adresse = {
          region: formData.region,
          codePostal: formData.codePostal,
          complement: formData.complement,
          ville: formData.ville,
          nomRue: formData.nomRue,
          numeroRue: formData.numero_Rue,
          id: undefined,
          departement: formData.departement,
        };

        // Appeler le service pour ajouter la nouvelle adresse
        const adresseObservable = this.adresseServices.ajoutAdresse(nouvelleAdresse);

        // S'abonner à l'observable pour traiter la réponse ou les erreurs
        this.subscription.push(
          adresseObservable.subscribe(
            (nouvelleAdresseAjoutee: Adresse) => {
              // Mettre à jour l'ID de l'adresse dans le centre hospitalier
              this.centrehospitalier.id = nouvelleAdresseAjoutee.id as number;
              //this.centrehospitalier.adresse?.id = nouvelleAdresseAjoutee.id;

              // Mettre à jour les autres propriétés du centre hospitalier avec les nouvelles valeurs du formulaire
              this.centrehospitalier.nom_ch = formData.nom_ch;
              this.centrehospitalier.email_ch = formData.email_ch;
              this.centrehospitalier.telephone = formData.telephone;
              this.centrehospitalier.siret = formData.siret;
              // Appeler le service pour effectuer la mise à jour du centre hospitalier
              const chObservable = this.centreHospitalierServices.editCh(this.chId, this.centrehospitalier);
              // S'abonner à l'observable pour traiter la réponse ou les erreurs
              this.subscription.push(
                chObservable.subscribe(
                  (updatedCentreHospitalier: CentreHospitalier) => {
                    // Traitement après la mise à jour réussie
                    console.log('Mise à jour réussie', updatedCentreHospitalier);
                  },
                  (error) => {
                    console.error('Erreur lors de la mise à jour du centre hospitalier', error);
                    // Gérer l'erreur selon vos besoins
                  }
                )
              );
            },
            (error) => {
              console.error('Erreur lors de l\'ajout de la nouvelle adresse', error);
              // Gérer l'erreur selon vos besoins
            }
          )
        );
      } else {
        // Aucune modification d'adresse, mettre à jour les autres propriétés du centre hospitalier
        this.centrehospitalier.nom_ch = formData.nom_ch;
        this.centrehospitalier.email_ch = formData.email_ch;
        this.centrehospitalier.telephone = formData.telephone;
        this.centrehospitalier.siret = formData.siret;
        // Appeler le service pour effectuer la mise à jour du centre hospitalier
        const chObservable = this.centreHospitalierServices.editCh(this.chId, this.centrehospitalier);
        // S'abonner à l'observable pour traiter la réponse ou les erreurs
        this.subscription.push(
          chObservable.subscribe(
            (updatedCentreHospitalier: CentreHospitalier) => {
              // Traitement après la mise à jour réussie
              console.log('Mise à jour réussie', updatedCentreHospitalier);
            },
            (error) => {
              console.error('Erreur lors de la mise à jour du centre hospitalier', error);
              // Gérer l'erreur selon vos besoins
            }
          )
        );
      }
    }
  }
}*/

}