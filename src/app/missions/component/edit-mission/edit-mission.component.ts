import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MedecinService } from 'src/app/Medecin/Services/medecin.service';
import { CentreHospitalierService } from 'src/app/centreHospitalier/Services/centre-hospitalier.service';
import { Adresse } from 'src/app/shared/Model/Adresse';
import { CentreHospitalier } from 'src/app/shared/Model/CentreHospitalier';
import { Medecin } from 'src/app/shared/Model/Medecin';
import { Missions } from 'src/app/shared/Model/Missions';
import { Specialite } from 'src/app/shared/Model/Specialite';
import { MissionService } from '../../services/mission.service';
import { ToastService } from 'src/app/Utilisateur/Services/toast.service';
import { AdresseService } from 'src/app/Adresses/Services/adresse.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale, frLocale } from 'ngx-bootstrap/chronos';


@Component({
  selector: 'app-edit-mission',
  templateUrl: './edit-mission.component.html',
  styleUrls: ['./edit-mission.component.css']
})
export class EditMissionComponent {

  mission!: Missions;
  subscribtion=[] as Subscription[];
  missionForm!:FormGroup;
  showDropdownMed: boolean = false;
  showDropdownCh: boolean = false;
  showDropdownSpecialiste: boolean = false;
  selectedAddress: any; 
  selectedSpecialite: any; 
  selectedCh: any;
  selectedMedecin: any;  
  submitted: boolean= false;
  specialiteSeletionne: any=null;
  specialites= [] as Specialite[];
  medecinSeletionne: any=null;
  medecins= [] as Medecin[];
  centreHospitaliers= [] as CentreHospitalier[];
  chSeletionne: any=null;
  chs= [] as CentreHospitalier[];
  adresseSelectionnee: any = null;  // Stocke l'adresse sélectionnée
  adresses = [] as Adresse[];
  adresse=new Adresse();
  centreHospitalier=new CentreHospitalier();
  medecin=new Medecin();
  typeMissionSelectionner: string='';

  searchText: string ="";
  afficherFormulaireAdresse: boolean = false;
  adresse_id: number | undefined;
  ch_id: number | undefined;
  medecin_id: number | undefined;
  specialite_id: number | undefined;
  missionId:  number=0;

  constructor(
    private centrehsoptalierServices: CentreHospitalierService,
    private medecinServices: MedecinService,
    private missionServices: MissionService,
    private toastService: ToastService,
    private formBuilder: FormBuilder,
    private adresseServices: AdresseService,
    private router: Router,
    private route: ActivatedRoute,
    private localeService: BsLocaleService){
      defineLocale('fr', frLocale);
    this.localeService.use('fr');
    }

  ngOnInit(): void {
    this.initForm();
    this.getAdresse();
    this.getMedecin();
    this.getSpecialite();
    this.getCh();
   
   
  }

  initForm() {

    this.route.params.subscribe(params => {
      this.missionId = +params['id']; 
    });
    
    this.missionForm = this.formBuilder.group({
      detailMission: ['', Validators.required],
      typeHoraireMission: ['', Validators.required],
      statutAnnonce : ['', Validators.required],
      salaireMission: [null, [Validators.required]],
      dateMissions: ['', Validators.required],
      dateFinMissions: ['', Validators.required],
      centreHospitalier: ['', Validators.required],
      medecin: ['', Validators.required],
      specialite: ['', Validators.required],
      startTime: [null, Validators.required],
      endTime: [null, Validators.required],

      //adresse_id: [this.adresse_id, Validators.required], 
      // Ajoutez d'autres contrôles si nécessaire
    });
    this.loadMissions();
  }

  goBack() {
    this.router.navigate(['/listeMission/list-mission']);
  }

  selectSpecialite(specialite: Specialite) {
    this.selectedSpecialite = specialite;
    this.specialite_id = specialite.id;
    this.showDropdownSpecialiste = false; // Masquer la liste déroulante après la sélection
  }
  
  deselectSpecialite() {
    this.selectedSpecialite = null;
    this.showDropdownSpecialiste = false; // Ne pas dérouler la liste après la désélection
  }
  
selectMedecin(medecin: Medecin) {
  this.selectedMedecin = medecin;
  this.medecin_id = medecin.id;
  this.showDropdownMed = false; // Masquer la liste déroulante après la sélection
}

deselectMedecin() {
  this.selectedMedecin = null;
  this.showDropdownMed = false; // Ne pas dérouler la liste après la désélection
}
selectCh(ch: CentreHospitalier) {
  this.selectedCh = ch;
  this.ch_id = ch.id;
  this.showDropdownCh = false; // Masquer la liste déroulante après la sélection
}

deselectCh() {
  this.selectedCh = null;
  this.showDropdownCh = false; // Ne pas dérouler la liste après la désélection
}

toggleDropdownMedecin(){
  this.showDropdownMed = !this.showDropdownMed;
}
toggleDropdownSpecialite(){
  this.showDropdownSpecialiste = !this.showDropdownSpecialiste;
}
toggleDropdownCh(){
  this.showDropdownCh = !this.showDropdownCh;
}

getAdresse() {
  this.adresseServices.getAllAdresses() 
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

getSpecialite() {
  this.medecinServices.getSpecialite() 
    .subscribe(
      (specialite: any) => {
        this.specialites = specialite;
        console.log("Specialite"+this.specialites);  
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération des specialite :', error);       
       }
    );
}

getMedecin() {
  this.medecinServices.getMedecin() 
    .subscribe(
      (medecin: any) => {
        this.medecins = medecin;
        console.log("Medecin"+this.medecins);  
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération des Medecins :', error);       
       }
    );
}

getCh() {
  this.centrehsoptalierServices.getCh() 
    .subscribe(
      (ch: any) => {
        this.chs = ch;
        console.log("Centre Hospitalier"+this.chs);  
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération des Ch :', error);       
       }
    );
}

loadMissions(): void {
  // Charger les données de la Mission à éditer en fonction de l'ID
  this.subscribtion.push(
    this.missionServices.getMissionById(this.missionId).subscribe(
      (mission: Missions) => {
        this.selectedCh = mission.centreHospitalier;
        this.selectedMedecin = mission.medecin;
        this.selectedSpecialite = mission.specialite;

        this.missionForm.patchValue({
          detailMission: mission.detailMission,
          dateMissions: mission.dateMissions ? mission.dateMissions.toString().substring(0, 10) : null,
          dateFinMissions: mission.dateFinMissions ? mission.dateFinMissions.toString().substring(0, 10) : null,
          typeHoraireMission: mission.typeHoraireMission,
          statutAnnonce: mission.statutAnnonce,
          salaireMission: mission.salaireMission,
          startTime: mission.startTime,
          endTime: mission.endTime,
          centreHospitalier: this.selectedCh?.nom_ch,
          medecin: this.selectedMedecin?.nomMedecin,
          specialite: this.selectedSpecialite?.nomSpecialite,
        });
      },
      (error) => {
        console.error('Erreur lors du chargement de la Mission', error);
      }
    )
  );
}

modifierMission(){
  if (this.missionForm) {
    const typeMissionValue = this.missionForm.get('typeMission')?.value;
    this.typeMissionSelectionner= typeMissionValue;
    console.log('TypeMissionSelectionner: ' ,this.typeMissionSelectionner)
    // Faites quelque chose avec la valeur...
  }
  const formData = this.missionForm.value;

  const Missionamodifiee: Missions = {
    detailMission: formData. detailMission, 
    dateMissions: formData.dateMissions,  
    dateFinMissions: formData.dateFinMissions,
    typeHoraireMission: formData.typeHoraireMission,
    statutAnnonce: formData.statutAnnonce,
    salaireMission: formData.salaireMission,
    startTime: formData.startTime,
    endTime: formData.endTime,
    centreHospitalier: this.selectedCh,
    medecin: this.selectedMedecin,   
    specialite: this.selectedSpecialite,
    //adresse_id: this.adresse_id, 
  };    
  console.log(Missionamodifiee);
  // Appeler le service pour ajouter le nouveau mission
  const missObservable = this.missionServices.editMission(  this.missionId,Missionamodifiee);
  this.subscribtion.push(
    missObservable.subscribe(
      (editMission: Missions) => {
        // Traitement après l'ajout réussi  
        console.log('Ajout réussi', editMission);
        this.toastService.showSuccessToast()  
        // Réinitialiser le formulaire ou effectuer d'autres actions si nécessaire
        this.missionForm.reset();
      },
      (error) => { 
        console.error('Erreur lors de la modification du MISSIONS', error);
      }
    )
  );
}
}
