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

}
