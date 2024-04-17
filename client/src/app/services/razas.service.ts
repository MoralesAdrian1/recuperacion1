import { Injectable } from '@angular/core';
import { animalesModel, razaModel } from '../models/models';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RazasService {

  constructor(private http: HttpClient) { }
  domain: string="http://localhost:3000";
  getRaza() {
    return this.http.get<razaModel[]>(`${this.domain}/api/raza`).pipe(
      map(res => res)
    );
  }

  addRaza(newRaza: razaModel){
    return this.http.post<razaModel>(`${this.domain}/api/raza`,newRaza).pipe(
      map(res => res)
      );
  }

  deleteRaza(id: string){
    return this.http.delete<razaModel>(`${this.domain}/api/raza/${id}`).pipe(
      map(res => res)
      );
  }
  updateRaza(newRaza: razaModel) {
    return this.http.put(`${this.domain}/api/raza/${newRaza._id}`, newRaza).pipe(
      map(res => res)
    );
  }
  getAnimales(): Observable<animalesModel[]> {
    return this.http.get<animalesModel[]>(`${this.domain}/api/animal`).pipe(
      catchError((error: any) => throwError('Error al cargar animal'))
    );
  }
}
