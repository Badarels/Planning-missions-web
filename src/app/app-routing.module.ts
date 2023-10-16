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
        path: 'ajoutUtilisateur',
        loadChildren: () => import('./Utilisateur/utilisateur.module').then(m => m.UtilisateurModule)
      },
      {
        path: 'listeUtilisateur',
        loadChildren: () => import('./Utilisateur/utilisateur.module').then(m => m.UtilisateurModule)
      },
      {
      path: 'ajoutMedecin',
        loadChildren: () => import('./Medecin/medecin.module').then(m => m.MedecinModule)
      },
      {
        path: 'listeMedecin',
        loadChildren: () => import('./Medecin/medecin.module').then(m => m.MedecinModule)
      }

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
