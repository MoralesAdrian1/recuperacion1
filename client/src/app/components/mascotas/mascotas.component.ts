import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HistorialModel, animalesModel, razaModel, vacunasModel } from 'src/app/models/models';
import { HistorialService } from 'src/app/services/historial.service';


@Component({
  selector: 'app-mascotas',
  templateUrl: './mascotas.component.html',
  styleUrls: ['./mascotas.component.css']
})
export class MascotasComponent implements OnInit{
  historial: HistorialModel[] = [];
  vacuna:vacunasModel[]=[];
  animales:animalesModel[]=[];
  raza:razaModel[]=[];
  allRaza:razaModel[]=[];
  filteredRaza:razaModel[]=[];
  animalesFiltrados: HistorialModel[] = [];
  historialForm: FormGroup;
  mostrarFormularioVacuna: boolean = false;
  nuevaVacuna: vacunasModel = {
    nombreVacuna: '',
    fechaVacuna: ''
  };


  constructor(private HistorialService: HistorialService, private fb: FormBuilder) {
    this.historialForm = this.fb.group({
      _id: [''],
      duenio: ["", Validators.required],
      nombreMascota: ["", Validators.required],
      tipoAnimal: ["", Validators.required],
      nombreRaza: ["", Validators.required],
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


  //filtrarPorAnimal(animal: string) {
   // this.animalesFiltrados = this.animales.filter( => this.animales.tipoAnimal === tipoAnimal);
  //}

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
  agregarVacunaForm() {
    this.mostrarFormularioVacuna = true;
  }
  agregarVacuna() {
    if (this.nuevaVacuna.nombreVacuna && this.nuevaVacuna.fechaVacuna) {
      this.vacuna.push(this.nuevaVacuna); // Agregar la nueva vacuna al arreglo de vacunas
      this.nuevaVacuna = { nombreVacuna: '', fechaVacuna: '' }; // Reiniciar el objeto de nueva vacuna
      this.mostrarFormularioVacuna = false; // Ocultar el formulario después de agregar la vacuna
    }
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
  agregarConsulta() {
    const ConsultaGroup = this.fb.group({
      tipoConsulta: ['', Validators.required],
      observaciones:['', Validators.required], 
    });
    this.consultas.push(ConsultaGroup);
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
          //this.animalesFiltrados =[...this.animales];
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
