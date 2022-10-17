import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminComponent} from "./components/templates/admin/admin.component";
import {AuthComponent} from "./components/templates/auth/auth.component";
import {ErrorsComponent} from "./components/templates/errors/errors.component";

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: []
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then(mod => mod.LoginComponent),
      },
    ]
  },
  {
    path: 'error',
    component: ErrorsComponent,
    children: []
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
