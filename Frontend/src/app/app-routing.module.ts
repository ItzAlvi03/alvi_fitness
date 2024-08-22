import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: 'login', canActivate: [], component: LoginComponent},
  { path: 'notFound', component: NotFoundComponent},
  { path: '', pathMatch: 'full', redirectTo: 'login'},
  { path: '**', redirectTo: 'notFound'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
