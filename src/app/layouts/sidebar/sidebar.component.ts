import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isMobile = window.innerWidth < 1200;
  isCollapsed = false;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isMobile = window.innerWidth < 1200;
    if (!this.isMobile) {
      this.isCollapsed = false;
    }
  }

  toggle() {
    if (this.isMobile) {
      const sidebar = document.querySelector('.sidebar') as HTMLElement;
      sidebar.classList.toggle('show');
      this.isCollapsed = !this.isCollapsed;
    }
  }
}
