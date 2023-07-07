import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

//import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login.component';

const routes: Routes = [

    //{ path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: LoginComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {}
