import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderMasterComponent } from './order-master.component';

const routes: Routes = [
  {
    path: '',
    component : OrderMasterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderMasterRoutingModule { }
