import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersMasterComponent } from './customers-master.component';

const routes: Routes = [
  {
    path: '',
    component : CustomersMasterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersMasterRoutingModule { }
