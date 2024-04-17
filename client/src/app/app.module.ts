import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AnimalesComponent } from './components/animales/animales.component';
import { HistorialComponent } from './components/historial/historial.component';
import { MascotasComponent } from './components/mascotas/mascotas.component';
import { RazasComponent } from './components/razas/razas.component';
import { LoginComponent } from './components/login/login.component';
import { VacunasComponent } from './components/vacunas/vacunas.component';
import { RazasService } from './services/razas.service';
import { AnimalesService } from './services/animales.service';
import { VacunasService } from './services/vacunas.service';
import { LoginService } from './services/login.service';
import { HistorialService } from './services/historial.service';
import { MascotasService } from './services/mascotas.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FiltradoPipe } from './pipes/filtrado.pipe';
import { FilterPipe } from './pipes/filter.pipe';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AnimalesComponent,
    HistorialComponent,
    MascotasComponent,
    RazasComponent,
    LoginComponent,
    VacunasComponent,
    FiltradoPipe,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [RazasService,
              AnimalesService,
              VacunasService,
              LoginService,
              HistorialService,
              MascotasService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
