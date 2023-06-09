import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThmHeaderComponent } from './theme/thm-header/thm-header.component';
import { ThmMenubarComponent } from './theme/thm-menubar/thm-menubar.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




/**************** Prime-NG Content Import Here ******************/

import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import {ButtonModule} from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {MultiSelectModule} from 'primeng/multiselect';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { CalendarModule } from 'primeng/calendar';
import {ConfirmationService, MessageService} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import {RadioButtonModule} from 'primeng/radiobutton';
import { AutoCompleteModule } from 'primeng/autocomplete';
import {SelectButtonModule} from 'primeng/selectbutton';
import {ProgressBarModule} from 'primeng/progressbar'
import {InputSwitchModule} from 'primeng/inputswitch';
import { TranslateModule } from '@ngx-translate/core';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { TabViewModule } from 'primeng/tabview';

const PRIME_NG = [
  CalendarModule,
  DropdownModule,
  TableModule,
  ToastModule,
  ConfirmDialogModule,
  MultiSelectModule,
  ButtonModule,
  TableModule,
  ProgressSpinnerModule,
  RadioButtonModule,
  AutoCompleteModule,
  SelectButtonModule,
  ProgressBarModule,
  InputSwitchModule,
  InputTextModule,
  DialogModule,
  TabViewModule
  // ScrollPanelModule,
 
]


@NgModule({
  declarations: [
    ThmHeaderComponent,
    ThmMenubarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    TranslateModule,
    PRIME_NG
  ],
  providers: [MessageService,PrimeNGConfig,ConfirmationService],
  exports:[
    FormsModule,
    ReactiveFormsModule,
    ThmHeaderComponent,
    ThmMenubarComponent,
    HttpClientModule,
    TranslateModule,
    // BrowserAnimationsModule,
    PRIME_NG
  ]
})
export class SharedModule { }
