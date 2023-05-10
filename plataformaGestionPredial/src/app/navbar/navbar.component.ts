import { Component, OnInit } from '@angular/core';
import { Router,NavigationEnd, ActivatedRoute   } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{
  name = 'Get Current Url Route Demo';
  currentRoute: string ="";
  constructor(private route: ActivatedRoute) { 
    //console.log(router.url);
    
  //   router.events.filter(event => event instanceof NavigationEnd)
  //         .subscribe(event => 
  //          {
  //             this.currentRoute = event.url;          
  //             console.log(event);
  //          });
    
  }
  ngOnInit() {
    this.route.url.subscribe(console.log); // UrlSegment[]
  }
}

