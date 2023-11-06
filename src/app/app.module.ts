import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutsModule } from './layouts/layouts.module';
import { AuthetificationModule } from './authentification/authetification.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './shared/shared.module';
import { FormsModule } from '@angular/forms';
import { EditUtilisateurComponent } from './Utilisateur/Components/edit-utilisateur/edit-utilisateur.component';
import { AjoutMedecinComponent } from './Medecin/Components/ajout-medecin/ajout-medecin.component';
import { ListeMedecinComponent } from './Medecin/Components/liste-medecin/liste-medecin.component';
import { MedecinComponentComponent } from './Medecin/Components/medecin-component/medecin-component.component';


@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutsModule,
    AuthetificationModule, 
    NgbModule,
    SharedModule,
    FormsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})

export class AppModule { }
