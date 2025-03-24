import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  menus:Array<any>=[{id:1,open:false},{id:2,open:false},{id:3,open:false},{id:4,open:false},{id:5,open:false},{id:6,open:false},{id:7,open:false}]
  changeOpenLink(i:number):void{
    if(this.openLink==false) this.openLink=true;
    else this.openLink=false;
  }
  changeOpenLinks(i:number):void{
    this.menus.forEach((m:any)=>{
      if(m.id==i)m.open=!m.open
    })
  }

  constructor (private router: Router){

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
  
  logout():any{
    localStorage.removeItem("jwt_token")
    // this.router.navigateByUrl("http://localhost:8006/login").then(() => {
    //   window.location.reload();
    // });
    window.location.reload();
  }
  
  //$(".menu click").addClass('menu-active')
}
