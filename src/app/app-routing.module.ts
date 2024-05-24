import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainContaintsComponent } from './layouts/main-containts/main-containts.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: MainContaintsComponent,
    children: [
  
      {
        path: 'main',
        loadChildren: () => import('./layouts/layouts.module').then(m => m.LayoutsModule)
      },
      {
        path: 'Accueil',
        loadChildren: () => import('./accueil/accueil.module').then(a => a.AccueilModule)
      },
      {
        path: 'ajoutUtilisateur',
        loadChildren: () => import('./Utilisateur/utilisateur.module').then(m => m.UtilisateurModule)
      },
      {
        path: 'listeUtilisateur',
        loadChildren: () => import('./Utilisateur/utilisateur.module').then(m => m.UtilisateurModule)
      },
      {
        path: 'ModifierUtilisateur',
        loadChildren: () => import('./Utilisateur/utilisateur.module').then(m => m.UtilisateurModule)
      },
      {
        path: 'ProfilUtilisateur',
        loadChildren: () => import('./Utilisateur/utilisateur.module').then(m => m.UtilisateurModule)
      },
      {
      path: 'ajoutMedecin',
        loadChildren: () => import('./Medecin/medecin.module').then(m => m.MedecinModule)
      },
      {
        path: 'listeMedecin',
        loadChildren: () => import('./Medecin/medecin.module').then(m => m.MedecinModule)
      },
      {
        path: 'profilMedecin',
        loadChildren: () => import('./Medecin/medecin.module').then(m => m.MedecinModule)
      },
      {
        path: 'ajoutCentreHospitalier',
        loadChildren: () => import('./centreHospitalier/centre-hospitalier.module').then(ch => ch.CentreHospitalierModule)
      },
      {
        path: 'listeCentreHospitalier',
        loadChildren: () => import('./centreHospitalier/centre-hospitalier.module').then(ch => ch.CentreHospitalierModule)
      },
      {
        path: 'editCentreHospitalier',
        loadChildren: () => import('./centreHospitalier/centre-hospitalier.module').then(ch => ch.CentreHospitalierModule)
      },
      {
        path: 'ajoutMission',
        loadChildren: () => import('./missions/mission.module').then(mis => mis.MissionModule)
      },
      {
        path: 'editMission',
        loadChildren: () => import('./missions/mission.module').then(mis => mis.MissionModule)
      },
      {
        path: 'listeMission',
        loadChildren: () => import('./missions/mission.module').then(mis => mis.MissionModule)
      },
      {
        path: 'profilMission',
        loadChildren: () => import('./missions/mission.module').then(mis => mis.MissionModule)
      },
      {
        path: 'planningMission',
        loadChildren: () => import('./plannings/planning.module').then(pla => pla.PlanningModule)
      },
    ]
  },
  {
    path: 'login',
    loadChildren: () => import('./authentification/authetification.module').then(m => m.AuthetificationModule )
  }
  
 /*{ path: 'login', component: LoginComponent },
  {path: 'ajouterUtulisateur', component: AjouterUtilisateurComponent},
  { path: 'main', component: MainContaintsComponent}*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
