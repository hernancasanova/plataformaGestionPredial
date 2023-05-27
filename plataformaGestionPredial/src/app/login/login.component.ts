import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service: LoginService, private router: Router) { }

  ngOnInit(): void {
  }



  login():void{
    //let r:any=this.service.getRegisters().subscribe(result=>{
    let username=(document.getElementById('username') as HTMLInputElement).value;
    let password=(document.getElementById('password') as HTMLInputElement).value;
    this.service.login(username, password).subscribe(r => {
      //return r.results;
      if(r){
        localStorage.setItem("jwt_token","vigniunvgtin")
        //this.router.navigate(["dashboard"], { relativeTo:  })
      }else{
        alert("error al ingresar sus credenciales")
      }
      console.log("r: ",r)
      //this.h = r.results;
      //console.log("this.h: ",this.h)
    }); 
    //alert("alertando")

  }

}
