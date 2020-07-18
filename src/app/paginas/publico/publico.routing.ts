import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicoComponent } from './publico/publico.component';
import { IndexComponent } from './components/index/index.component';
import { LinkCobrosComponent } from './components/link-cobros/link-cobros.component';
import { InformacionComponent } from './components/informacion/informacion.component';


const routes: Routes = [
      {
        path: '',
        component: InformacionComponent
      },
      {
        path: "index/:idComercio/:descripcion/:total/:impuestos",
        component: IndexComponent
      },
      {
        path: "index/:idComercio/:descripcion/:total/:impuestos/:idCobro",
        component: IndexComponent
      },
      {
        path: "link/:idLink",
        component: LinkCobrosComponent
      },
      {
        path: "informacion",
        component: InformacionComponent
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
