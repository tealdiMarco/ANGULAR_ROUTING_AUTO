import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ClienteComponent } from './cliente/cliente.component';
import { AmministratoreComponent } from './amministratore/amministratore.component';

const routes: Routes = [ //qua ci sono tutti i percorsi che il sito segue che portano ad altre pagine 
  {path:"", component:LoginComponent}, //! quando non c'e nulla nel path lo mandi al component login
  {path:"login", component:LoginComponent},
  {path:"cliente", component:ClienteComponent},
  {path:"amministratore", component:AmministratoreComponent},
  {path:"register", redirectTo:"/login" },//Rimando su route già esistente
  {path:"**", component: PageNotFoundComponent }// ** = quando la route che cerco non esiste
  
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
