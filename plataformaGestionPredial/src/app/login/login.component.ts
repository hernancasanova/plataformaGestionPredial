import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  uri: string="";
  textButton: string="";
  action: any;
  loading: boolean=false;
  constructor(private service: LoginService, private router: Router, private route: ActivatedRoute) {
    // this.route.params.subscribe(
    //   (params: Params) => {
    //     if(params['id']){
    //       //console.log(params['id'])
    //       //this.id=parseInt(params['id']);
    //       //this.configurations.title="Edit bovine"
    //     }
    //   }
    // );
    router.events.subscribe(e=>{
      if(e instanceof NavigationEnd ){
        this.uri=e.url.replace("/","")
        console.log("this.uri: ",this.uri)
        if(this.uri=="login"){
          this.textButton="Login"
          this.action=this.login
        }
        else {
          this.textButton="Create account"
          this.action=this.register
        }
      }
    })

  }

  ngOnInit(): void {
  }

  login(e:any):void{
    this.textButton="Logging..."
    this.loading=true;
    e.preventDefault();
    //let r:any=this.service.getRegisters().subscribe(result=>{
    let username=(document.getElementById('username') as HTMLInputElement).value;
    let password=(document.getElementById('password') as HTMLInputElement).value;
    this.service.login(username, password).subscribe(r => {
      //return r.results;
      this.textButton="Login"
      this.loading=false;
      if(r){
        localStorage.setItem("jwt_token","vigniunvgtin")
        this.router.navigate(["dashboard"])
      }else{
        Swal.fire({
          title: 'jol',
          text: "An error happen trying login your account. Try again",
          icon: 'error',
          confirmButtonText: 'Accept'
        })
      }
      console.log("r: ",r)
      //this.h = r.results;
      //console.log("this.h: ",this.h)
    }); 
    //let jwt_token=localStorage.getItem("jwt_token")
    //if(jwt_token)this.router.navigate(["dashboard"])
    //alert("alertando")

  }

  register(e:any):void{
    this.loading=true;
    this.textButton="Creating account..."
    e.preventDefault();
    //let r:any=this.service.getRegisters().subscribe(result=>{
    let username=(document.getElementById('username') as HTMLInputElement).value;
    let password=(document.getElementById('password') as HTMLInputElement).value;
    this.service.register(username, password).subscribe(r => {
      //return r.results;
      this.loading=false;
      this.textButton="Create account"
      if(r){
        Swal.fire({
          title: '',
          text: "User created succesfully. Login with your credentials",
          icon: 'success',
          confirmButtonText: 'Accept'
        })
        this.router.navigate(["login"])
      }else{
        Swal.fire({
          title: 'jol',
          text: "An error happen trying create your account. Try again",
          icon: 'error',
          confirmButtonText: 'Accept'
        })
      }
    }); 

  }

  submitForm(e:any){
    this.action(e)    
  }

}
