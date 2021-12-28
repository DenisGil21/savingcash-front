import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public cargando:boolean = false;

  public registroForm = this.fb.group({
    nombre: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', Validators.required],
  }, {
    validators: this.passwordsIguales('password', 'password2')
  });

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private router:Router) { }

  ngOnInit(): void {
  }

  campoNoValido(campo: string): Boolean {
    return this.registroForm.get(campo)!.invalid && this.registroForm.get(campo)!.touched;
  }

  registrarse(): void {
    if (this.registroForm.invalid) {
      return Object.values(this.registroForm.controls).forEach(control => control.markAllAsTouched());
    }
    this.cargando = true;
    const data = {
      rol: 'USER_ROLE',
      ...this.registroForm.value
    }
    this.usuarioService.registroUsuario(data)
    .subscribe(resp => {
      console.log(resp);
      
      this.cargando = false;
      this.router.navigateByUrl('dashboard');
    }, (err) => {
      console.log(err);
      this.cargando = false;
      Swal.fire('Error', err.error, 'error');
      
    });
  }

  passwordsIguales(pass1: string, pass2: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);      
      if (pass1Control?.value === pass2Control?.value) {
        pass2Control?.setErrors(null);
        return null;
      } else {
        pass2Control?.setErrors({ noEsIgual: true });
        return { noEsIgual: true }
      }
    }
  }

}
