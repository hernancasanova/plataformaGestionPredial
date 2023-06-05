import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsComponent } from './forms/forms.component';
import { MainGuard } from './guards/main.guard';
import { ListComponent } from './list/list.component';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './login/login.routing';
import { MainComponent } from './main/main.component';
import { TableComponent } from './table/table.component';
import { TablesComponent } from './tables/tables.component';

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
      { path: 'dashboard', component: DashboardComponent, data:{type:"dashboard"}},
      { path: 'bovines', component: TableComponent, data:{type:"bovines"}},
      { path: 'documents', component: FormsComponent, data:{type:"documents"}},
      { path: 'list', component: ListComponent, data:{type:"list"}},//ListComponent
      { path: 'machines', component: TablesComponent, data:{type:"machines"}},
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
