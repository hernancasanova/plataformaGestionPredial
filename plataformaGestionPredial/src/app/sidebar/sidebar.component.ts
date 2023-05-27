import { Component, OnInit } from '@angular/core';
import { faCow, faDashboard, faToolbox } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  faCow = faCow;
  faDashboard = faDashboard;
  faToolbox = faToolbox;
  openLink=false;
  changeOpenLink():void{
    if(this.openLink==false) this.openLink=true;
    else this.openLink=false;
  }

  addClass = function (n:number): void {
    //let li=e.target.value;
    const active=document.getElementById(n.toString());
    Array.from(document.querySelectorAll('.active')).forEach(
      (el) => el.classList.remove('active')
    );
    //const liActive=document.querySelector('active');
    // const liActive=document.querySelectorAll('active');
    // [].forEach.call(liActive, function(el) {
    //   el.className.remove("hover");
    // });
    //liActive?.removeClass
    active?.classList.add("active")
    //console.log("n: ",n)
  } 
  
  //$(".menu click").addClass('menu-active')
}
