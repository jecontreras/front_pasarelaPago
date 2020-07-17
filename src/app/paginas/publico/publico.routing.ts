import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicoComponent } from './publico/publico.component';
import { IndexComponent } from './components/index/index.component';


const routes: Routes = [
      {
        path: '',
        component: IndexComponent
      },
      {
        path: "index/:idComercio/:descripcion/:total/:impuestos",
        component: IndexComponent
      }
      /*{
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      }*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicoRoutingModule { }
