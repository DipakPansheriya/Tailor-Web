import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersMasterRoutingModule } from './customers-master-routing.module';
import { CustomersMasterComponent } from './customers-master.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [CustomersMasterComponent],
  imports: [
    CommonModule,
    CustomersMasterRoutingModule,
    SharedModule
  ]
})
export class CustomersMasterModule { }
