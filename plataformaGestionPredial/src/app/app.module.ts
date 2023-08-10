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
//import { Table2Component } from './table2/table2.component';
//import { TablesComponent } from './tables/tables.component';
//import { TablesModule } from './tables/tables.module';
import { ProComponent } from './shared/pro/pro.component';
import { FooterComponent } from './footer/footer.component';
import { BovinesModule } from './bovines/bovines.module';
import { DocumentsModule } from './documents/documents.module';
import { ReactiveFormsModule } from '@angular/forms';
import { IdentifiersModule } from './identifiers/identifiers.module';
import { MachinesModule } from './machines/machines.module';
import { TableComponent } from './shared/table/table.component';
//import { ToastGlobalComponent } from './toast-global/toast-global.component';


@NgModule({
  declarations: [
    AppComponent,
    //FormsComponent,
    MainComponent,
    //Table2Component,
    ProComponent,
    FooterComponent,
    TableComponent,
    //ToastGlobalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardModule,
    SidebarModule,
    NavbarModule,
    ReactiveFormsModule,
    //FormsModule,
    RouterModule,
    NgbModule,
    CommonModule,
    BrowserAnimationsModule, 
    LoginModule,
    // TableModule,
    //TablesModule,
    IdentifiersModule,
    BovinesModule,
    DocumentsModule,
    MachinesModule
  ],
  providers: [MainGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
