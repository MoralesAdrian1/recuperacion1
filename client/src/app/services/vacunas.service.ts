import { Injectable } from '@angular/core';
import { animalesModel, vacunasModel } from '../models/models';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VacunasService {

  constructor(private http: HttpClient) { }
  domain: string="http://localhost:3000";
  getVacunas() {
    return this.http.get<vacunasModel[]>(`${this.domain}/api/vacuna`).pipe(
      map(res => res)
    );
  }

  addVacunas(newVacunas: vacunasModel){
    return this.http.post<vacunasModel>(`${this.domain}/api/vacuna`,newVacunas).pipe(
      map(res => res)
      );
  }

  deleteVacunas(id: string){
    return this.http.delete<vacunasModel>(`${this.domain}/api/vacuna/${id}`).pipe(
      map(res => res)
      );
  }
  updateVacunas(newVacunas: vacunasModel) {
    return this.http.put(`${this.domain}/api/vacuna/${newVacunas._id}`, newVacunas).pipe(
      map(res => res)
    );
  }
  getAnimales(): Observable<animalesModel[]> {
    return this.http.get<animalesModel[]>(`${this.domain}/api/animal`).pipe(
      catchError((error: any) => throwError('Error al cargar animal'))
    );
  }
}
