import { Component, Input, OnInit } from '@angular/core';
import { MovimientoElement } from '../../interfaces/movimiento.interface';

@Component({
  selector: 'app-modal-detail',
  templateUrl: './modal-detail.component.html',
})
export class ModalDetailComponent implements OnInit {

  @Input() movimiento!:MovimientoElement;

  constructor() { }

  ngOnInit(): void {
  }

}
