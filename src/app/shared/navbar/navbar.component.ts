import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private usuarioService:UsuarioService, private router:Router) { }

  ngOnInit(): void {
  }

  cerrarSesion(): void{
    this.usuarioService.logout();
    this.router.navigateByUrl('auth/login');
  }

}
