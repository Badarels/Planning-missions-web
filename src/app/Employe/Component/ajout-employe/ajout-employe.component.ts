import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Employe } from 'src/app/shared/Model/Employe';
import { EmployeService } from '../../Services/employe.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale, frLocale } from 'ngx-bootstrap/chronos';

@Component({
  selector: 'app-ajout-employe',
  templateUrl: './ajout-employe.component.html',
  styleUrl: './ajout-employe.component.css'
})
export class AjoutEmployeComponent {

  employe!: Employe;
  subscribtion=[] as Subscription[];
  employeForm!:FormGroup;
  showDropdownMed: boolean = false;
  showDropdownCh: boolean = false;
  submitted: boolean= false;

  typeEmployeSelectionner: string='';

  searchText: string ="";


  constructor(

    private employeServices: EmployeService,
    private toastService: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router,
    private localeService: BsLocaleService){
      defineLocale('fr', frLocale);
    this.localeService.use('fr');
    }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.employeForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      statutAnnonce : ['', Validators.required],
      salaireDeBase: [null, [Validators.required]],
      datenaissance: ['', Validators.required],
      dateEmboche: ['', Validators.required],
      lieunaissance: ['', Validators.required],
      email: ['', Validators.required],
      telephone: ['', Validators.required],
      poste: ['', Validators.required],
      type: ['', Validators.required],
      sexe: ['', Validators.required],
      adresseEmploye: ['', Validators.required],
      ipres: ['', Validators.required],
      vrs: ['', Validators.required],
    });
  }

  goBack() {
    this.router.navigate(['/ListeEmploye/list-employe']);
  }

AjouterEmploye(){

  if (this.employeForm) {
    const typeEmployeValue = this.employeForm.get('typeEmploye')?.value;
    this.typeEmployeSelectionner= typeEmployeValue;
    console.log('TypeEmployeSelectionner: ' ,this.typeEmployeSelectionner)  // Faites quelque chose avec la valeur...
  }
  const formData = this.employeForm.value;

  const nouveauEmploye: Employe = {
    id: undefined,
    nom: formData.nom, 
    prenom: formData.prenom, 
    salaireDeBase: formData.salaireDeBase, 
    datenaissance: formData.datenaissance, 
    dateEmboche: formData.dateEmboche, 
    lieunaissance: formData.lieunaissance,
    email: formData.email, 
    telephone: formData.telephone, 
    poste: formData.poste, 
    type: formData.type, 
    sexe: formData.sexe, 
    adresseEmploye: formData.adresseEmploye, 
    ipres: formData.ipres, 
    vrs: formData.vrs, 
  };    
  console.log(nouveauEmploye);
  // Appeler le service pour ajouter le nouveau mission
  const empObservable = this.employeServices.ajoutEmploye(nouveauEmploye);
  this.subscribtion.push(
    empObservable.subscribe(
      (addedEmploye: Employe) => {
        // Traitement après l'ajout réussi  
        console.log('Ajout réussi', addedEmploye);
        this.toastService.success();  
        // Réinitialiser le formulaire ou effectuer d'autres actions si nécessaire
        this.employeForm.reset();
      },
      (error) => { 
        console.error('Erreur lors de l\'ajout de l\'employe', error);
      }
    )
  );
}
}



