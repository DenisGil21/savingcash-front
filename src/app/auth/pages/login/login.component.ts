import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  public cargando:boolean = false;

  constructor(private fb: FormBuilder, private usuarioService:UsuarioService, private router:Router) { }

  ngOnInit(): void {
  }

  campoNoValido(campo:string): Boolean {
    return this.loginForm.get(campo)!.invalid && this.loginForm.get(campo)!.touched;
  }

  iniciarSesion(): void {
    if (this.loginForm.invalid) {
      return Object.values(this.loginForm.controls).forEach(control => control.markAllAsTouched());
    }
    this.cargando = true;
    this.usuarioService.login(this.loginForm.value)
    .subscribe(resp => {
      this.cargando = false;
      console.log(resp);
      this.router.navigateByUrl('dashboard')
    },(err) => {
      this.cargando = false;
      console.log(err);
      Swal.fire('Error', err.error.msj, 'error');
    });

  }

}
