import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { animalesModel } from 'src/app/models/models';
import { AnimalesService } from 'src/app/services/animales.service';

@Component({
  selector: 'app-animales',
  templateUrl: './animales.component.html',
  styleUrls: ['./animales.component.css']
})
export class AnimalesComponent implements OnInit {
  animal: animalesModel[] = [];
  animalForm: FormGroup;

  constructor(private AnimalService: AnimalesService, private fb: FormBuilder) {
    this.animalForm = this.fb.group({
      _id: [''],
      tipoAnimal: ["", Validators.required],
    });
  }

  ngOnInit() {
    this.cargarAnimal();
  }

  cargarAnimal() {
    this.AnimalService.getAnimales().subscribe(
      data => {
        this.animal = data;
      },
      error => {
        console.error('Error al cargar datos Personales:', error);
      }
    );
  }

  agregarAnimal() {
    if (this.animalForm.valid) {
      this.AnimalService.addAnimales(this.animalForm.value).subscribe(
        () => {
          this.cargarAnimal();
          this.animalForm.reset();
        },
        error => {
          console.error('Error al agregar Datos Personales:', error);
        }
      );
    }
  }

  actualizarAnimal() {
    if (this.animalForm.valid) {
      this.AnimalService.updateAnimales(this.animalForm.value).subscribe(
        () => {
          this.cargarAnimal();
          this.animalForm.reset();
        },
        error => {
          console.error('Error al actualizar Datos Personales:', error);
        }
      );
    }
  }

  eliminarAnimal(id: string | undefined) {
    if (id) {
      this.AnimalService.deleteAnimales(id).subscribe(
        data => {
          console.log('Pais eliminado:', data);
          this.cargarAnimal();
        },
        error => {
          console.error('Error al eliminar Pais:', error);
        }
      );
    }
  }

  editarAnimal(animal: animalesModel) {
    this.animalForm.patchValue(animal);
  }
}
