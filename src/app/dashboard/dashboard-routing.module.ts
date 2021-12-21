import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes:Routes = [
  {
    path:'',
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path:'**',
        redirectTo:'dashboard'
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutingModule { }
