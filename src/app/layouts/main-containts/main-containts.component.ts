import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-main-containts',
  templateUrl: './main-containts.component.html',
  styleUrls: ['./main-containts.component.css']
})
export class MainContaintsComponent implements OnInit {
  title: string = 'Tableau de bord';

  constructor(private router: Router) {}

  ngOnInit() {
    // Mettre à jour le titre en fonction de la route active
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateTitle();
    });
  }

  private updateTitle() {
    const route = this.router.routerState.snapshot.root.firstChild;
    if (route?.data) {
      this.title = route.data['title'] || 'Tableau de bord';
    }
  }
}
