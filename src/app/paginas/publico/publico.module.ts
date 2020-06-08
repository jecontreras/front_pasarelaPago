import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicoComponent } from './publico/publico.component';
import { PublicoRoutingModule } from './publico.routing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IndexComponent } from './components/index/index.component';
import { MyOwnCustomMaterialModule } from 'src/app/app.material.module';



@NgModule({
  declarations: [
    PublicoComponent,
    IndexComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PublicoRoutingModule,
    MyOwnCustomMaterialModule
  ],
  bootstrap: [ PublicoComponent ]
})
export class PublicoModule { }
