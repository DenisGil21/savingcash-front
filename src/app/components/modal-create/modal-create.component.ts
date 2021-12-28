import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { MovimientoService } from '../../services/movimiento.service';
declare var bootstrap:any;

@Component({
  selector: 'app-modal-create',
  templateUrl: './modal-create.component.html',
})
export class ModalCreateComponent implements OnInit {

  public movimientoForm = this.fb.group({
    cantidad: ['', Validators.required],
    tipo: ['', Validators.required],
    concepto: ['', Validators.required]
  });
  public myModal:any;
  
  @Output() movimientoCreado = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder, private movimientoService: MovimientoService) { }

  ngOnInit(): void {
    this.myModal = new bootstrap.Modal(document.getElementById('createModal'), {
      keyboard: false
    })
  }

  guardarMovimiento():void {
    if (this.movimientoForm.invalid) {
      return Object.values(this.movimientoForm.controls).forEach(control => control.markAllAsTouched());
    }

    this.movimientoService.postMovimiento(this.movimientoForm.value)
      .subscribe(resp => {
        this.movimientoForm.reset();
        this.movimientoForm.get('tipo')?.setValue('');
        Swal.fire({
          title:'Guardado',
          icon:'success'
        });
        this.movimientoCreado.emit(true);
      }, (err) => {
        Swal.fire('Error', 'Ha ocurrido un error intente mas tarde', 'error');
        this.movimientoCreado.emit(false);
      });
      this.myModal.hide();
  }

  campoNoValido(campo: string): Boolean {
    return this.movimientoForm.get(campo)!.invalid && this.movimientoForm.get(campo)!.touched;
  }

}
