import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { animalesModel, vacunasModel } from 'src/app/models/models';
import { VacunasService } from 'src/app/services/vacunas.service';

@Component({
  selector: 'app-vacunas',
  templateUrl: './vacunas.component.html',
  styleUrls: ['./vacunas.component.css']
})
export class VacunasComponent implements OnInit {
  vacuna: vacunasModel[] = [];
  vacunaForm: FormGroup;

  constructor(private VacunasService: VacunasService, private fb: FormBuilder) {
    this.vacunaForm = this.fb.group({
      _id: [''],
      nombreVacuna: ["", Validators.required],
    });
  }

  ngOnInit() {
    this.cargarVacunas();
  }

  cargarVacunas() {
    this.VacunasService.getVacunas().subscribe(
      data => {
        this.vacuna = data;
      },
      error => {
        console.error('Error al cargar datos Personales:', error);
      }
    );
  }

  agregarVacuna() {
    if (this.vacunaForm.valid) {
      this.VacunasService.addVacunas(this.vacunaForm.value).subscribe(
        () => {
          this.cargarVacunas();
          this.vacunaForm.reset();
        },
        error => {
          console.error('Error al agregar Datos Personales:', error);
        }
      );
    }
  }

  actualizarVacuna() {
    if (this.vacunaForm.valid) {
      this.VacunasService.updateVacunas(this.vacunaForm.value).subscribe(
        () => {
          this.cargarVacunas();
          this.vacunaForm.reset();
        },
        error => {
          console.error('Error al actualizar Datos Personales:', error);
        }
      );
    }
  }

  eliminarVacuna(id: string | undefined) {
    if (id) {
      this.VacunasService.deleteVacunas(id).subscribe(
        data => {
          console.log('Estado eliminado:', data);
          this.cargarVacunas();
        },
        error => {
          console.error('Error al eliminar Estado:', error);
        }
      );
    }
  
  }

  editarVacuna(vacuna: vacunasModel) {
    this.vacunaForm.patchValue(vacuna);
  }

}