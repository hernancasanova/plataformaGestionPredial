import { Component, OnInit } from '@angular/core';
import { faCow, faDashboard } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  faCow = faCow;
  faDashboard = faDashboard;
  openLink=false;
  changeOpenLink():void{
    if(this.openLink==false) this.openLink=true;
    else this.openLink=false;
  }
  
  //$(".menu click").addClass('menu-active')
}
