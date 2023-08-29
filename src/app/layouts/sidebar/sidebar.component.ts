import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  sidebarLinks = [
    { label: 'Accueil', route: '/acceuil' },
    { label: 'Gestion_utilisiateur', route: '/utilisateur' },
    { label: 'login', route: '/login' }
    // ... Ajoutez d'autres liens ici
  ];

}
