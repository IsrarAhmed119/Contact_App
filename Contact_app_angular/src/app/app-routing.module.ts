import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './componets/login/login.component';
import { SignupComponent } from './componets/signup/signup.component';
import { HomeComponent } from './componets/home/home.component';
import { AuthGuard } from './services/auth-guard/auth.guard';
import { AddcontactComponent } from './componets/addcontact/addcontact.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  // {
  //   path: "signup/:id",
  //   component: SignupComponent,
  //   canActivate: [AuthGuard],
  // },

  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },

  {
    path: 'addContact',
    component: AddcontactComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'addContact/:id',
    component: AddcontactComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
