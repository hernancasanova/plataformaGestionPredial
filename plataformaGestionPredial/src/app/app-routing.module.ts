import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BovinesComponent } from './bovines/bovines.component';
import { DeleteComponent } from './bovines/delete/delete.component';
import { BusinessComponent } from './business/business.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DocumentsComponent } from './documents/documents.component';
import { ListDocumentsComponent } from './documents/list-documents/list-documents.component';
import { FormsComponent } from './forms/forms.component';
import { MainGuard } from './guards/main.guard';
import { IdentifiersComponent } from './identifiers/identifiers.component';
import { ListIdentifiersComponent } from './identifiers/list-identifiers/list-identifiers.component';
import { ListComponent } from './list/list.component';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './login/login.routing';
import { MachinesComponent } from './machines/machines.component';
import { MainComponent } from './main/main.component';
import { ProComponent } from './shared/pro/pro.component';
import { TableComponent } from './shared/table/table.component';
import { WorksComponent } from './works/works.component';
//import { TableComponent } from './table/table.component';

const routes: Routes = [
  {
    path: 'logout',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path:'',
    component:MainComponent,
    canActivate: [MainGuard],
    children:[
      { path: '', component: ProComponent, data:{type:"dashboard"}},
      { path: 'dashboard', component: DashboardComponent, data:{type:"dashboard"}},
      { path: 'bovines', component: ListComponent, data:{type:"bovines"}},
      { path: 'documents', component: ListDocumentsComponent, data:{type:"documents"}},
      { path: 'documents/create', component: DocumentsComponent, data:{type:"documents"}},
      { path: 'identifiers', component: ListIdentifiersComponent, data:{type:"identifiers"}},
      { path: 'identifiers/create', component: IdentifiersComponent, data:{type:"identifiers"}},
      //{ path: 'list', component: ListComponent, data:{type:"list"}},//ListComponent    inputs
      { path: 'business', component: BusinessComponent},
      { path: 'works', component: WorksComponent},
      { path: 'machines', component: MachinesComponent, data:{type:"machines"}},
      { path: 'bovines/create', component: BovinesComponent, data:{title:"Create"}},
      { path: 'bovines/edit/:id', component: BovinesComponent, data:{title:"Edit"}},
      { path: 'bovines/delete/:id', component: DeleteComponent, data:{title:"Delete"}},
    ]
  }
  /*,
  {
    path:'dashboard',
    component:DashboardComponent,
    canActivate:[MainGuard]
  },
  {
    path:'forms',
    component:FormsComponent,
    canActivate:[MainGuard]
  },
  {
    path:'list',
    component:ListComponent,
    canActivate:[MainGuard]
  }*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    AuthRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
