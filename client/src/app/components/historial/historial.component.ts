import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HistorialModel, animalesModel, razaModel, vacunasModel } from 'src/app/models/models';
import { HistorialService } from 'src/app/services/historial.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit{
  historial: HistorialModel[] = [];
  vacuna:vacunasModel[]=[];
  animales:animalesModel[]=[];
  raza:razaModel[]=[];
  allRaza:razaModel[]=[];
  filteredRaza:razaModel[]=[];
  historialForm: FormGroup;
  mostrarFormulario: boolean = false;
  filterpost: string = '';
  filterAnimal: string = '';
  filterMascota: string = '';


  constructor(private HistorialService: HistorialService, private fb: FormBuilder) {
    this.historialForm = this.fb.group({
      _id: [''],
      duenio: ["", Validators.required],
      nombreMascota: ["", Validators.required],
      tipoAnimal: ["", ],
      nombreRaza: ["",],
      vacunas: this.fb.array([]),
      consultas: this.fb.array([])
    });
  }

  ngOnInit() {
    this.cargarHistorial();
    this.cargarRaza();
    this.cargarVacunas();
    this.cargarAnimales();
  }
  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  cargarHistorial() {
    this.HistorialService.getHistorial().subscribe(
      data => {
        this.historial = data;
      },
      error => {
        console.error('Error al cargar datosL:', error);
      }
    );
  }

  agregarHistorial() {
    if (this.historialForm.valid) {
      const nuevoHistorial: HistorialModel = this.historialForm.value;
      this.HistorialService.addHistorial(nuevoHistorial).subscribe(
        () => {
          this.cargarHistorial();
          this.historialForm.reset();
        },
        error => {
          console.error('Error al agregar historial', error);
        }
      );
    }
  }

  actualizarHistorial() {
    if (this.historialForm.valid) {
      const HistorialActualizado: HistorialModel = this.historialForm.value;
      this.HistorialService.updateHistorial(HistorialActualizado).subscribe(
        () => {
          this.cargarHistorial();
          this.historialForm.reset();
        },
        error => {
          console.error('Error al actualizar datosL:', error);
        }
      );
    }
  }

  eliminarHistorial(id: string | undefined) {
    if (id) {
      this.HistorialService.deleteHistorial(id).subscribe(
        data => {
          console.log('historial eliminado:', data);
          this.cargarHistorial();
        },
        error => {
          console.error('Error al eliminar historial:', error);
        }
      );
    }
  }

  editarHistorial(historial: HistorialModel) {
    this.historialForm.patchValue(historial);
  }

//---------------------------------------------------------
  //vacunas
  agregarVacuna() {
    const vacunaGroup = this.fb.group({
      nombreVacuna: ['', Validators.required],
      fechaVacuna: ['', Validators.required],
    });
    this.vacunas.push(vacunaGroup);
  }
  
  
    get vacunas() {
      return this.historialForm.get('vacunas') as FormArray;
    }
  //cargar vacunas
  cargarVacunas(){
    this.HistorialService.getVacunas().subscribe(
      data =>{
        this.vacuna = data;
      },
      error => {
        console.log("Error",error);
      }
    )
  }
//---------------------------------------------------------------
  //Consultas
  agregarConsulta(tipoConsulta: string = '', observaciones: string = '') {
    const consultaGroup = this.fb.group({
        tipoConsulta: [tipoConsulta, Validators.required],
        observaciones: [observaciones, Validators.required],
    });
    this.consultas.push(consultaGroup);
}
  
  
    get consultas() {
      return this.historialForm.get('consultas') as FormArray;
    }
//------------------------------------------------------------------------
    //filtrar datos de raza
    cargarAnimales() {
      this.HistorialService.getAnimales().subscribe(
        data => {
          this.animales = data;
        },
        error => {
          console.error('Error al cargar Paises:', error);
        }
      );
    }


    filtrarAnimalPorRaza(tipoAnimal: string) {
      this.filteredRaza = this.allRaza.filter(raza => raza.tipoAnimal === tipoAnimal);
    }
    cargarRaza() {
  
      this.HistorialService.getRazas().subscribe(
        data => {
          this.allRaza = data;
        },
        error => {
          console.error('Error al cargar Raza:', error);
        }
      );
    }
    onAnimalSelected(event: any) {
      const tipoAnimalSeleccionado = event.target.value;
      if (tipoAnimalSeleccionado !== null) {
        this.filtrarAnimalPorRaza(tipoAnimalSeleccionado);
      }
    }

}

