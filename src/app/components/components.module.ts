import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalDetailComponent } from './modal-detail/modal-detail.component';
import { ModalCreateComponent } from './modal-create/modal-create.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ModalDetailComponent,
    ModalCreateComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    ModalDetailComponent,
    ModalCreateComponent
  ]
})
export class ComponentsModule { }
