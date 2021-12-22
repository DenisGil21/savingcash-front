import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Movimiento, MovimientoElement, MovimientoPost } from '../interfaces/movimiento.interface';
import { Observable } from 'rxjs';

const url = `${environment.base_url}/movimientos`;

@Injectable({
  providedIn: 'root'
})
export class MovimientoService {

  constructor(private http: HttpClient) { }

  getMovimientos(): Observable<Movimiento>{
    return this.http.get<Movimiento>(url);
  }

  postMovimiento(formData: MovimientoPost): Observable<MovimientoElement>{
    return this.http.post<MovimientoElement>(url, formData);
  }

  deleteMovimiento(id:string): Observable<MovimientoElement>{
    return this.http.delete<MovimientoElement>(`${url}/${id}`);
  }
}
