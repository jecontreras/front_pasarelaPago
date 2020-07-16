import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ContenidoComponent } from './components/contenido/contenido.component';
import { AuthService } from 'src/app/services/auth.service';
import { PerfilComponent } from './relleno/perfil/perfil.component';
import { CobrosComponent } from './components/cobros/cobros.component';
import { ProyectosComponent } from './components/recaudo/proyectos/proyectos.component';
import { TransaccionesComponent } from './components/reportes/transacciones/transacciones.component';
import { CertificadoRetencionComponent } from './components/reportes/certificado-retencion/certificado-retencion.component';
import { AsobancariaComponent } from './components/reportes/asobancaria/asobancaria.component';
import { FacturasComponent } from './components/reportes/facturas/facturas.component';
import { SaldosRetirosComponent } from './components/saldos-retiros/saldos-retiros.component';
import { PropiedadesCuentaComponent } from './components/configuraciones/propiedades-cuenta/propiedades-cuenta.component';
import { MedioPagoComponent } from './components/configuraciones/medio-pago/medio-pago.component';
import { MovimientosComponent } from './components/reportes/movimientos/movimientos.component';
import { FormHerramientacobrosComponent } from './forms/form-herramientacobros/form-herramientacobros.component';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        canActivate: [AuthService],
        children: [
          {path: '', redirectTo: 'home', pathMatch: 'full'},
          {
            path: 'home',
            component: ContenidoComponent
          },
          {
            path: 'cobros',
            component: CobrosComponent
          },
          {
            path: 'recaudo/proyectos',
            component: ProyectosComponent
          },
          {
            path: 'reportes/transacciones',
            component: TransaccionesComponent
          },
          {
            path: 'reportes/movimiento',
            component: MovimientosComponent
          },
          {
            path: 'reportes/certificadoretencion',
            component: CertificadoRetencionComponent
          },
          {
            path: 'reportes/asobancaria',
            component: AsobancariaComponent
          },
          {
            path: 'reportes/facturas',
            component: FacturasComponent
          },
          {
            path: 'saldoretiro',
            component: SaldosRetirosComponent
          },
          {
            path: 'configuraciones/propiedades',
            component: PropiedadesCuentaComponent
          },
          {
            path: 'configuraciones/medios',
            component: MedioPagoComponent
          },
          {
            path: 'perfil',
            component: PerfilComponent
          },
          {
            path: "formherramientacobros/:opt",
            component: FormHerramientacobrosComponent
          },
          {
            path: "formherramientacobros/:id",
            component: FormHerramientacobrosComponent
          },
          {path: '**', redirectTo: 'home', pathMatch: 'full'}
        ]
      },
      /*{
        path: '*',
        redirectTo: 'dashboard/home',
        pathMatch: 'full'
      },
      {
        path: '',
        redirectTo: 'dashboard/home',
        pathMatch: 'full'
      }*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardUserRoutingModule { }
