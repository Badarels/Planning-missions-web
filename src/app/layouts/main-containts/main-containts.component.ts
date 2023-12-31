import { Component } from '@angular/core';


@Component({
  selector: 'app-main-containts',
  templateUrl: './main-containts.component.html',
  styleUrls: ['./main-containts.component.css']
})
export class MainContaintsComponent {
  toggle(){
    const element= document.body as HTMLElement
    element.classList.toggle('toggle-sidebar')
 }


}
