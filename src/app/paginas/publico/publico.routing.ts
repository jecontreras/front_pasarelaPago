import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicoComponent } from './publico/publico.component';
import { IndexComponent } from './components/index/index.component';


const routes: Routes = [
      {
        path: '',
        component: PublicoComponent
      },
      {
        path: '**',
        redirectTo: 'index',
        pathMatch: 'full'
      },
      {
        path: "index",
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
