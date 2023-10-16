import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { RoleModel } from 'src/app/shared/Model/Role.Model';
import { UtilisateurModel } from 'src/app/shared/Model/Utilisateur.model';
import { UtilisateurService } from '../../Services/utilisateur.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-ajouter-utilisateur',
  templateUrl: './ajouter-utilisateur.component.html',
  styleUrls: ['./ajouter-utilisateur.component.css']
})
export class AjouterUtilisateurComponent implements OnInit{

  subscriptions = [] as Subscription[];
  connectedUser = new UtilisateurModel();

  roles = [] as RoleModel[];
  role=new RoleModel();
 // forme = new FormeModel();
  utilisateur = new UtilisateurModel();
  userForm!: FormGroup;


constructor(
  //private toastr: ToastrService,
  private UtilisateurServices: UtilisateurService
){}

private initForm(utilisateur: UtilisateurModel){
  if(utilisateur){
    if(utilisateur && utilisateur.id){
    this.role = utilisateur && utilisateur.roles ? utilisateur.roles : new RoleModel();
    }
    this.userForm=new FormGroup({
      'nomuser':new FormControl(utilisateur?.nomUser,[Validators.required]),
      'prenomuser': new FormControl(utilisateur?.prenomUser, [Validators.required]),
      'adresseuser': new FormControl(utilisateur?.adresseuser, [Validators.required]),
      'passworduser': new FormControl(utilisateur?.passwordUser, [Validators.required]),
      'telephoneuser': new FormControl(utilisateur?.telephoneUser, [Validators.required]),
      'datenaissuser': new FormControl(utilisateur?.date_naissanceUser,[Validators.required]),
      'sexeuser': new FormControl(utilisateur?.sexeUser, [Validators.required]),
      'emailuser': new FormControl(utilisateur?.emailUser, [Validators.required]),
      'ineuser': new FormControl(utilisateur?.numero_piece_identiteUser, [Validators.required])

    });
  }else{
    this.userForm=new FormGroup({
      'nomuser':new FormControl(null,[Validators.required]),
      'prenomuser': new FormControl(null, [Validators.required]),
      'adresseuser': new FormControl(null,[Validators.required]),
      'passworduser': new FormControl(null, [Validators.required]),
      'telephoneuser': new FormControl(null, [Validators.required]),
      'datenaissuser': new FormControl(null,[Validators.required]),
      'sexeuser': new FormControl(null, [Validators.required]),
      'emailuser': new FormControl(null, [Validators.required]),
      'ineuser': new FormControl(null, [Validators.required])
    })
  }
}

  ngOnInit(): void {
      this.initForm(new UtilisateurModel());
  }

  shouldShowNomRequiredError() {
    const nomuser = this.userForm.controls['nomUser'];
    return nomuser.touched && nomuser.hasError('required');
  }
  shouldShowPreomRequiredError() {
    const prenomuser= this.userForm.controls['prenomUser'];
    return prenomuser.touched && prenomuser.hasError('required');
  }
  shouldShowAdresseRequiredError() {
    const adresseuser = this.userForm.controls['adresseuser'];
    return adresseuser.touched && adresseuser.hasError('required');
  }
  shouldShowTelephoneRequiredError() {
    const telephoneUser = this.userForm.controls['nomUser'];
    return telephoneUser.touched && telephoneUser.hasError('required');
  }

  shouldShowDateNaissanceRequiredError() {
    const datenaissuser = this.userForm.controls['datenaissuser'];
    return datenaissuser.touched && datenaissuser.hasError('required');
  }
  shouldShowSexeRequiredError() {
    const sexeuser = this.userForm.controls['sexeUser'];
    return sexeuser.touched && sexeuser.hasError('required');
  }
  shouldShowIneRequiredError() {
    const ineuser = this.userForm.controls['ineUser'];
    return ineuser.touched && ineuser.hasError('ineUser');
  }
 /* showCustomToast() {
    this.toastr.success('Message personnalisé', 'Titre personnalisé', {
      timeOut: 3000, // Temps en millisecondes avant que la notification disparaisse (facultatif)
      progressBar: true, // Afficher une barre de progression (facultatif)
      closeButton: true, // Afficher un bouton de fermeture (facultatif)
      positionClass: 'toast-top-right', // Position de la notification (facultatif)
    });
  }*/
  onSaveUtilisateur() {
    if (this.utilisateur) {
      this.utilisateur.nomUser= this.userForm.value.nomuser;
      this.utilisateur.prenomUser = this.userForm.value.prenomuser;
      this.utilisateur.adresseuser = this.userForm.value.adresseuser;
      this.utilisateur.passwordUser = this.userForm.value.passworduser;
      this.utilisateur.date_naissanceUser = this.userForm.value.datenaissuser;
      this.utilisateur.telephoneUser=this.userForm.value.telephoneuser;
      this.utilisateur.sexeUser=this.userForm.value.sexeuser;
      this.utilisateur.emailUser=this.userForm.value.emailuser;
      this.utilisateur.numero_piece_identiteUser=this.userForm.value.ineuser;
      
      this.subscriptions.push(
        (this.utilisateur.id ? this.UtilisateurServices.editUser(this.utilisateur,this.utilisateur.id)
          : this.UtilisateurServices.addUser(this.utilisateur))
        .subscribe(
          () => {
            console.log('');
          },(error) => {
            console.error('Erreur lors de l\'ajout des utilisateurs :', error);
          }, () => {
            //alert('ajout d\'utilisateur avec succes');
           // this.showCustomToast();
           return true;
          }
        )
      );
    }
  }

}
