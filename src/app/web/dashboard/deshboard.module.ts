import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeshboardRoutingModule } from './deshboard-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardComponent } from './dashboard.component';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DeshboardRoutingModule,
    SharedModule
  ]
})
export class DeshboardModule { }
