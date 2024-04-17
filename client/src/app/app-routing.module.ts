import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormGroup, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AnimalesComponent } from './components/animales/animales.component';
import { HistorialComponent } from './components/historial/historial.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MascotasComponent } from './components/mascotas/mascotas.component';
import { RazasComponent } from './components/razas/razas.component';
import { VacunasComponent } from './components/vacunas/vacunas.component';
import { BrowserModule } from '@angular/platform-browser';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path: 'home',component: HomeComponent},
  {path:'historial',component:HistorialComponent},
  {path:'mascotas',component:MascotasComponent},
  {path:'razas',component:RazasComponent},
  {path:'vacunas',component:VacunasComponent},
  {path:'animales',component:AnimalesComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
