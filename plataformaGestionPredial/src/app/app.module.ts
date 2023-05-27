import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { SidebarModule } from './sidebar/sidebar.module';
import { NavbarModule } from './navbar/navbar.module';
import { FormsModule } from '@angular/forms';
import { FormsComponent } from './forms/forms.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule } from './login/login.module';
import { MainGuard } from './guards/main.guard';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    FormsComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardModule,
    SidebarModule,
    NavbarModule,
    FormsModule,
    RouterModule,
    NgbModule,
    CommonModule,
    BrowserAnimationsModule, 
    LoginModule
  ],
  providers: [MainGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
