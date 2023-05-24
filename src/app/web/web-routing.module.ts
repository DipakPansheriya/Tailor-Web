import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth-gaurd/auth.guard';
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
      pathMatch: 'full',
      canActivate:[AuthGuard]
    },
    {
      path: 'dashboard',
      loadChildren: () => import('../web/dashboard/deshboard.module').then(m => m.DeshboardModule),
      canActivate: [AuthGuard]
    },
    {
      path: 'customers',
      loadChildren: () => import('./customers-master/customers-master.module').then(m => m.CustomersMasterModule),
      canActivate: [AuthGuard]
    },
    {
      path: 'orders',
      loadChildren: () => import('./order-master/order-master.module').then(m => m.OrderMasterModule),
      canActivate: [AuthGuard]
    },
    {
      path: 'pattern-master',
      loadChildren: () => import('./pattern-master/pattern-master.module').then(m => m.PatternMasterModule),
      canActivate: [AuthGuard]
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebRoutingModule { }
