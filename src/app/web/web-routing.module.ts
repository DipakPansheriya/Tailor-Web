import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebMainComponent } from './web-main/web-main.component';

// const redirectLogin = () =>  redirectUnauthorizedTo(['login']);

const routes: Routes = [{
  path: '',
  component: WebMainComponent,
  // ...canActivate(redirectLogin),


  children: [
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full'
    },
    {
      path: 'dashboard',
      loadChildren: () => import('../web/dashboard/deshboard.module').then(m => m.DeshboardModule)
    },
    {
      path: 'customers',
      loadChildren: () => import('./customers-master/customers-master.module').then(m => m.CustomersMasterModule)
    },
    {
      path: 'orders',
      loadChildren: () => import('./order-master/order-master.module').then(m => m.OrderMasterModule)
    },
    {
      path: 'pattern-master',
      loadChildren: () => import('./pattern-master/pattern-master.module').then(m => m.PatternMasterModule)
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebRoutingModule { }
