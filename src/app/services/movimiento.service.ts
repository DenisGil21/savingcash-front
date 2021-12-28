import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Movimiento, MovimientoElement, MovimientoPost, MovimientosAnios, MovimientoParameters } from '../interfaces/movimiento.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const url = `${environment.base_url}/movimientos`;

@Injectable({
  providedIn: 'root'
})
export class MovimientoService {

  constructor(private http: HttpClient) { }

  getMovimientos(parametros?: MovimientoParameters): Observable<Movimiento> {
    let params = new HttpParams();
    
    params = params.set('desde', String(parametros?.desde));
    if (parametros?.mes) {
      params = params.set('mes', parametros.mes);
    }

    if (parametros?.anio) {
      params = params.set('anio', parametros.anio);
    }

    return this.http.get<Movimiento>(url, { params });
  }

  getMovimientosAnios(): Observable<MovimientosAnios[]> {
    return this.http.get(`${url}/anios`)
    .pipe(
      map((resp:any)=>{
        return resp.anios;
      })
    );
  }

  postMovimiento(formData: MovimientoPost): Observable<MovimientoElement> {
    return this.http.post<MovimientoElement>(url, formData);
  }

  deleteMovimiento(id: string): Observable<MovimientoElement> {
    return this.http.delete<MovimientoElement>(`${url}/${id}`);
  }
}
