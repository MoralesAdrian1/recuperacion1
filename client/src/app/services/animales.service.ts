import { Injectable } from '@angular/core';
import { animalesModel } from '../models/models';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnimalesService {

  constructor(private http: HttpClient) { }
  domain: string="http://localhost:3000";
  getAnimales() {
    return this.http.get<animalesModel[]>(`${this.domain}/api/animal`).pipe(
      map(res => res)
    );
  }

  addAnimales(newAnimales: animalesModel){
    return this.http.post<animalesModel>(`${this.domain}/api/animal`,newAnimales).pipe(
      map(res => res)
      );
  }

  deleteAnimales(id: string){
    return this.http.delete<animalesModel>(`${this.domain}/api/animal/${id}`).pipe(
      map(res => res)
      );
  }
  updateAnimales(newAnimales: animalesModel) {
    return this.http.put(`${this.domain}/api/animal/${newAnimales._id}`, newAnimales).pipe(
      map(res => res)
    );
  }
}
