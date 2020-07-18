import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicoComponent } from './publico/publico.component';
import { PublicoRoutingModule } from './publico.routing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IndexComponent } from './components/index/index.component';
import { MyOwnCustomMaterialModule } from 'src/app/app.material.module';
import { NgxCurrencyModule } from 'ngx-currency';
import { LinkCobrosComponent } from './components/link-cobros/link-cobros.component';
import { InformacionComponent } from './components/informacion/informacion.component';



@NgModule({
  declarations: [
    PublicoComponent,
    IndexComponent,
    LinkCobrosComponent,
    InformacionComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PublicoRoutingModule,
    MyOwnCustomMaterialModule,
    NgxCurrencyModule
  ],
  bootstrap: [ PublicoComponent ]
})
export class PublicoModule { }
