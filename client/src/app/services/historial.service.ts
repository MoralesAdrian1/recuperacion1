import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HistorialModel, animalesModel, razaModel, vacunasModel } from '../models/models';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {

  constructor(private http: HttpClient) { }
  domain: string = "http://localhost:3000";

  getHistorial() {
    return this.http.get<HistorialModel[]>(`${this.domain}/api/historial`).pipe(
      map(res => res.map(item => this.parseHistorialModel(item)))
    );
  }

  addHistorial(newHistorial: HistorialModel) {
    return this.http.post<HistorialModel>(`${this.domain}/api/historial`, newHistorial).pipe(
      map(res => this.parseHistorialModel(res))
    );
  }

  deleteHistorial(id: string) {
    return this.http.delete<HistorialModel>(`${this.domain}/api/historial/${id}`).pipe(
      map(res => this.parseHistorialModel(res))
    );
  }

  updateHistorial(newHistorial: HistorialModel) {
    return this.http.put<HistorialModel>(`${this.domain}/api/historial/${newHistorial._id}`, newHistorial).pipe(
      map(res => this.parseHistorialModel(res))
    );
  }

  // Método para convertir la respuesta del servidor al tipo DatosLModel
  private parseHistorialModel(data: any): HistorialModel {
    // Aquí puedes implementar la lógica necesaria para convertir la respuesta del servidor al tipo DatosLModel
    return data as HistorialModel;
  }
  //---------------------------------------------------------------------------------------------------
  getAnimales(): Observable<animalesModel[]> {
    return this.http.get<animalesModel[]>(`${this.domain}/api/animal`).pipe(
      catchError((error: any) => throwError('Error al cargar animal'))
    );
  }
  getRazas(): Observable<razaModel[]> {
    return this.http.get<razaModel[]>(`${this.domain}/api/raza`).pipe(
      catchError((error: any) => throwError('Error al cargar raza'))
    );
  }
  getVacunas(): Observable<vacunasModel[]> {
    return this.http.get<vacunasModel[]>(`${this.domain}/api/vacuna`).pipe(
      catchError((error: any) => throwError('Error al cargar vacuna'))
    );
  }
}
