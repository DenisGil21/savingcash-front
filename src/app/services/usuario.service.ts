import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Login, LoginForm, RegistroUsuario } from '../interfaces/usuario.interface';
import { map, tap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Usuario } from '../models/usuario.model';

const url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario!: Usuario;

  constructor(private http: HttpClient) { }

  login(formData: LoginForm): Observable<Login> {
    return this.http.post<Login>(`${url}/auth/login`, formData)
      .pipe(
        tap(resp => {
          localStorage.setItem('token', resp.token)
        })
      );
  }

  registroUsuario(formData: RegistroUsuario): Observable<Login> {
    return this.http.post<Login>(`${url}/usuarios`, formData)
      .pipe(
        tap(resp => {
          localStorage.setItem('token', resp.token)
        })
      )
  }

  validarToken(): Observable<boolean> {
    return this.http.get<Login>(`${url}/auth/renew`
    ).pipe(
      map(resp => {
        const { username, nombre, uid, rol } = resp.usuario;
        this.usuario = new Usuario(nombre, username, rol, uid);
        localStorage.setItem('token',resp.token);
        localStorage.setItem('username', username);
        return true;
      }),
      catchError(error => of(false))
    );
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }
}
