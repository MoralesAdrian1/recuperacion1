import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { animalesModel, razaModel } from 'src/app/models/models';
import { AnimalesService } from 'src/app/services/animales.service';
import { RazasService } from 'src/app/services/razas.service';

@Component({
  selector: 'app-razas',
  templateUrl: './razas.component.html',
  styleUrls: ['./razas.component.css']
})
export class RazasComponent implements OnInit {
  animal: animalesModel[] = [];
  raza: razaModel[] = [];
  razaForm: FormGroup;

  constructor(private RazaService: RazasService, private fb: FormBuilder) {
    this.razaForm = this.fb.group({
      _id: [''],
      tipoAnimal: ["", Validators.required],
      nombreRaza: ["", Validators.required],
    });
  }

  ngOnInit() {
    this.cargarAnimales();
    this.cargarRazas();
  }

  cargarRazas() {
    this.RazaService.getRaza().subscribe(
      data => {
        this.raza = data;
      },
      error => {
        console.error('Error al cargar datos Personales:', error);
      }
    );
  }

  agregarRaza() {
    if (this.razaForm.valid) {
      this.RazaService.addRaza(this.razaForm.value).subscribe(
        () => {
          this.cargarRazas();
          this.razaForm.reset();
        },
        error => {
          console.error('Error al agregar Datos Personales:', error);
        }
      );
    }
  }

  actualizarRaza() {
    if (this.razaForm.valid) {
      this.RazaService.updateRaza(this.razaForm.value).subscribe(
        () => {
          this.cargarRazas();
          this.razaForm.reset();
        },
        error => {
          console.error('Error al actualizar Datos Personales:', error);
        }
      );
    }
  }

  eliminarRaza(id: string | undefined) {
    if (id) {
      this.RazaService.deleteRaza(id).subscribe(
        data => {
          console.log('Estado eliminado:', data);
          this.cargarRazas();
        },
        error => {
          console.error('Error al eliminar Estado:', error);
        }
      );
    }
  
  }

  editarRaza(raza: razaModel) {
    this.razaForm.patchValue(raza);
  }
  cargarAnimales() {
    this.RazaService.getAnimales().subscribe(
      data => {
        this.animal = data;
      },
      error => {
        console.error('Error al cargar Animales:', error);
      }
    );
  }
}