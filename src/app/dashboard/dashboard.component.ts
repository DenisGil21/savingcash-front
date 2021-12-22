import { Component, OnInit } from '@angular/core';
import { MovimientoService } from '../services/movimiento.service';
import { MovimientoElement } from '../interfaces/movimiento.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public movimientos: MovimientoElement[] = [];
  public movimiento!: MovimientoElement;

  constructor(private movimientoService: MovimientoService) { }

  ngOnInit(): void {
    this.obtenerMovimientos();
  }

  obtenerMovimientos(): void {
    this.movimientoService.getMovimientos()
      .subscribe(resp => {
        this.movimientos = resp.movimientos;
      });
  }

  cargarDataModal(movimiento: MovimientoElement): void {
    this.movimiento = movimiento;
  }


  eliminarMovimiento(id: string): void {
    Swal.fire({
      title: 'Etas seguro?',
      text: "No podras revertir esto",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.movimientoService.deleteMovimiento(id)
          .subscribe(resp => {
            Swal.fire(
              'Eliminado!',
              'El movimiento ha sido eliminado',
              'success'
            );
            this.obtenerMovimientos();
          });
      }
    });
  }

}
