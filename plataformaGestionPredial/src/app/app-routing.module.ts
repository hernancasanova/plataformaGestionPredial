import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsComponent } from './forms/forms.component';
import { MainGuard } from './guards/main.guard';
import { ListComponent } from './list/list.component';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './login/login.routing';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'dashboard',
  //   pathMatch: 'full'
  // },
  {
    path:'',
    component:MainComponent,
    canActivate: [MainGuard],
    children:[
      { path: '', component: DashboardComponent},
      { path: 'forms', component: FormsComponent},
      { path: 'list', component: ListComponent},
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
