import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderMasterRoutingModule } from './order-master-routing.module';
import { OrderMasterComponent } from './order-master.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [OrderMasterComponent],
  imports: [
    CommonModule,
    OrderMasterRoutingModule,
    SharedModule
  ]
})
export class OrderMasterModule { }
