import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatternMasterComponent } from './pattern-master.component';

const routes: Routes = [
  {
    path: '',
    component : PatternMasterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatternMasterRoutingModule { }
