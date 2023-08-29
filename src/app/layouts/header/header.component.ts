import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    toggle(){
       const element= document.body as HTMLElement
       element.classList.toggle('toggle-sidebar')
    }
}
