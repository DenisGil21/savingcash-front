import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MovimientoService } from '../services/movimiento.service';
import { MovimientoElement, MovimientoParameters } from '../interfaces/movimiento.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public movimientos: MovimientoElement[] = [];
  public movimiento!: MovimientoElement;
  public ingresoMensual: number = 0;
  public gastoMensual: number = 0;
  public saldoTotal: number = 0;
  public parametros: MovimientoParameters = { anio: '', mes: '', desde: 0 };
  @ViewChild('asSelectAnio') selectAnio!: ElementRef;
  public totalMovimientos: number = 0;


  constructor(private movimientoService: MovimientoService) { }

  ngOnInit(): void {
    this.obtenerMovimientos();
    this.cargarSelectAnio();
  }

  obtenerMovimientos(): void {
    this.movimientoService.getMovimientos(this.parametros)
      .subscribe(resp => {
        this.movimientos = resp.movimientos;
        this.totalMovimientos = resp.total;
        if (!this.parametros?.mes && !this.parametros?.anio && !this.parametros.desde) {
          this.saldoTotal = resp.saldoTotal;
        }
        if (!this.parametros.desde) {
          this.ingresoMensual = resp.ingresoMensual;
          this.gastoMensual = resp.gastoMensual;
        }
      });
  }


  cargarSelectAnio() {
    this.movimientoService.getMovimientosAnios()
      .subscribe(anios => {
        let options = '<option value="">Filtrar por año</option>';
        for (const anio of anios) {
          options += `
            <option value="${anio._id}">${anio._id}</option>
          `
        }
        (this.selectAnio.nativeElement as HTMLSelectElement).innerHTML = options;
      });

  }

  cargarDataModal(movimiento: MovimientoElement): void {
    this.movimiento = movimiento;
  }

  refreshMovimientos(event: boolean) {
    if (event) {
      this.obtenerMovimientos();
    }
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

  movimientosPorMes(event: Event): void {
    const selectElement = (event.target as HTMLSelectElement);
    const mes = selectElement.value;
    this.parametros.mes = mes;
    this.obtenerMovimientos()
  }

  movimientosPorAnio(event: Event): void {
    const selectElement = (event.target as HTMLSelectElement);
    const anio = selectElement.value;
    this.parametros.anio = anio;
    this.obtenerMovimientos()
  }

  cambiarPagina(valor: number): void {
    this.parametros.desde += valor;

    if (this.parametros.desde < 0) {
      this.parametros.desde = 0
    }else if (this.parametros.desde > this.totalMovimientos){
      this.parametros.desde -= valor;
    }
    this.obtenerMovimientos();
  }

}
