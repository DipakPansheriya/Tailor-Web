import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatternMasterRoutingModule } from './pattern-master-routing.module';
import { PatternMasterComponent } from './pattern-master.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [PatternMasterComponent],
  imports: [
    CommonModule,
    PatternMasterRoutingModule,
    SharedModule
  ]
})
export class PatternMasterModule { }
