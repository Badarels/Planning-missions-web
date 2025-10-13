import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToastService } from 'src/app/Utilisateur/Services/toast.service';
import { Employe } from 'src/app/shared/Model/Employe';
import { EmployeService } from '../../Services/employe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale, frLocale } from 'ngx-bootstrap/chronos';

@Component({
  selector: 'app-edit-employe',
  templateUrl: './edit-employe.component.html',
  styleUrl: './edit-employe.component.css'
})
export class EditEmployeComponent {

  employe!: Employe;
  subscribtion=[] as Subscription[];
  employeForm!:FormGroup;
  showDropdownMed: boolean = false;
  showDropdownCh: boolean = false;
 
  submitted: boolean= false;

  searchText: string ="";
  afficherFormulaireAdresse: boolean = false;
  employeId:  number=0;

  typeEmployeSelectionner: string='';

  constructor(
    private employeServices: EmployeService,
    private toastService: ToastService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private localeService: BsLocaleService){
      defineLocale('fr', frLocale);
    this.localeService.use('fr');
    }

  ngOnInit(): void {
    this.initForm();    
  }

  initForm() {

    this.route.params.subscribe(params => {
      this.employeId = +params['id']; 
    });
    
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
    this.loadEmploye();
  }

  goBack() {
    this.router.navigate(['/ListeEmploye/list-employe']);
  }


loadEmploye(): void {
  // Charger les données de l'employé à éditer en fonction de l'ID
  this.subscribtion.push(
    this.employeServices.getEmpById(this.employeId).subscribe(
      (employe: Employe) => {
      
        this.employeForm.patchValue({

          nom: employe.nom,
          prenom: employe.prenom,
          sexe: employe.sexe,
          email: employe.email,
          telephone: employe.telephone,
          salaireDeBase: employe.salaireDeBase,
          poste: employe.poste,
          lieunaissance: employe.lieunaissance,
          datenaissance: employe.datenaissance ? employe.datenaissance.toString().substring(0, 10) : null,
          dateEmboche: employe.dateEmboche ? employe.dateEmboche.toString().substring(0, 10) : null,
          adresseEmploye: employe.adresseEmploye,
          ipres: employe.ipres,
          vrs: employe.vrs,
          type: employe.type,
        
        });
      },
      (error) => {
        console.error('Erreur lors du chargement de la Mission', error);
      }
    )
  );
}

modifierEmploye(){
  if (this.employeForm) {
    const typeValue = this.employeForm.get('type')?.value;
    this.typeEmployeSelectionner= typeValue;
    console.log('typeEmployeSelectionner: ' ,this.typeEmployeSelectionner)
    // Faites quelque chose avec la valeur...
  }
  const formData = this.employeForm.value;

  const employemodifiee: Employe = {
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
  console.log(employemodifiee);
  // Appeler le service pour ajouter le nouveau mission
  const empObservable = this.employeServices.editEmploye(this.employeId,employemodifiee);
  this.subscribtion.push(
    empObservable.subscribe(
      (editEmploye: Employe) => {
        // Traitement après l'ajout réussi  
        console.log('Modification réussi', editEmploye);
        this.toastService.showSuccessToast()  
        // Réinitialiser le formulaire ou effectuer d'autres actions si nécessaire
        this.employeForm.reset();
      },
      (error) => { 
        console.error('Erreur lors de la modification de l\'employé', error);
      }
    )
  );
}

}
