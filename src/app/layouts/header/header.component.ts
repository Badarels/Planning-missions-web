import { Component } from '@angular/core';
import { AuthServices } from '../../authentification/Services/auth.services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private authService: AuthServices) { }

  toggleSidebar() {
    const sidebar = document.querySelector('.sidebar') as HTMLElement;
    sidebar.classList.toggle('show');
  }

  logout() {
    this.authService.logout();
  }
}
