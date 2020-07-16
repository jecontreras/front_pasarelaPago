import { Component, OnInit } from '@angular/core';
import { APPINT } from 'src/app/interfaces/interfasapp';
import { Store } from '@ngrx/store';
import { IdiomasService } from 'src/app/services-components/idiomas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.component.html',
  styleUrls: ['./contenido.component.scss']
})
export class ContenidoComponent implements OnInit {
  
  dataUser: any = {};
  idiomas: any = {};
  info: any = {};

  table:any = {
    header: [],
    dataRow: []
  }

  constructor(
    private _store: Store<APPINT>,
    private _idiomas: IdiomasService,
    private Router: Router
  ) { 
    this._store.subscribe((store: any) => {
      console.log(store);
      store = store.name;
      this.dataUser = store.user;
    });
  }

  ngOnInit() {
    this.idiomas = this._idiomas.idiomaEs;
    this.table.header = this.idiomas.tables.ultimasTransaccion.header;
    this.table.dataRow = [
      {
        refPago :22089343, refCliente: "6R87D", descripcion: "Pauete para personas principiantes", medioPago: "./assets/imagenes/visa.png", valor: "$10,000.00", moneda: "COP", estado: "ACEPTADA", test: "Pruebas"
      },
      {
        refPago :22089343, refCliente: "6R87D", descripcion: "Pauete para personas principiantes", medioPago: "./assets/imagenes/visa.png", valor: "$10,000.00", moneda: "COP", estado: "ACEPTADA", test: "Pruebas"
      }
    ];
  }

  openHerramientaCobro( opt:string ){
    console.log( opt );
    this.Router.navigate( [ "dashboard/formherramientacobros", opt ] );
  }

}
