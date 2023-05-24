import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotpasswordComponent } from './Pages/forgotpassword/forgotpassword.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { AdminMasterComponent } from './Pages/admin-master/admin-master.component';
import { AuthGuard } from './auth-gaurd/auth.guard';


const routes: Routes = [
  {
    path:'',
    redirectTo:'login',
    pathMatch:'full'
  },
  {
    path:'login',
    component:LoginComponent,
  },
  {
    path:'register',
    component:RegisterComponent,
  },
  {
    path:'forgotpassword',
    component:ForgotpasswordComponent,
  },
  {
    path:'adminmaster',
    component:AdminMasterComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'web',
    canActivate:[AuthGuard],
    loadChildren: () => import('./web/web.module').then(m => m.WebModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
