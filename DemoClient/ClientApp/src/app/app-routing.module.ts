import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewpgComponent } from "./components/viewpg/viewpg.component";
import { FormpgComponent } from "./components/formpg/formpg.component";
import { AuthService } from './services/auth.service';
import { LoginComponent } from "./components/login/login.component";
//import { DeactivateService } from "./services/deactivateService";
//import { AclFormComponent } from "./components/acl-form/acl-form.component";

const routes: Routes = [
  {
    path: "",
    component: ViewpgComponent, canActivate: [AuthService]
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "quotes",
    component: ViewpgComponent, canActivate: [AuthService]
  },
  {
    path: 'quote/:id',
    component: FormpgComponent, canActivate: [AuthService]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
