import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'plataformaGestionPredial';
  jwt_token=localStorage.getItem("jwt_token")
  //login = false;
}
