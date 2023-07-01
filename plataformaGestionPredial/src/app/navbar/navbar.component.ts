import { Component, OnInit } from '@angular/core';
import { Router,NavigationEnd, ActivatedRoute   } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  name = 'Get Current Url Route Demo';
  currentRoute: string= "";
  constructor(private route: ActivatedRoute, private router: Router) { 
    //console.log(router.url);
    
    // router.events.filter(event => event instanceof NavigationEnd)
    //       .subscribe(event => 
    //        {
    //           this.currentRoute = event.url;          
    //           console.log(event);
    //        });
    router.events.subscribe(e=>{
      if(e instanceof NavigationEnd ){
        this.currentRoute=e.url;//.replace("/"," /")
      }
    })
    
  }
  logout():any{
    localStorage.removeItem("jwt_token")
    // this.router.navigateByUrl("http://localhost:8006/login")
  }
  ngOnInit() {
    //console.log(this.route.snapshot.paramMap);
    //console.log("mlvr: ",this.router.url)
    //this.currentRoute=this.router.url.replace("/","")
    //console.log("this.currenRoute: ",this.currentRoute)
    //this.route.queryParams.subscribe(params => console.log("v: ",params))
    //this.route.url.subscribe(console.log); // UrlSegment[]
  }
  // ngOnChanges(changes: SimpleChanges): void{
  //   if(changes.data!==undefined){
  //     let a:any=changes.data.currentValue;
  //     for (let i in a) {
  //         let date: any = new Date(a[i].date).toLocaleDateString(); 
  //         this.dataGraph.push(a[i].close);
  //         this.categories.push(date);
  //     }
  //   }
  //   if(changes.nemo !== undefined){
  //       let b=changes.nemo.currentValue;
  //       this.nemotecnio=b;
  //   }
  // }
}

