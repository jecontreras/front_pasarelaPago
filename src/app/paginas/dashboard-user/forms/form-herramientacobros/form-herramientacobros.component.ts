import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToolsService } from 'src/app/services/tools.service';
import { LinkPagoService } from 'src/app/services-components/link-pago.service';
import { APPINT } from 'src/app/interfaces/interfasapp';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';

@Component({
  selector: 'app-form-herramientacobros',
  templateUrl: './form-herramientacobros.component.html',
  styleUrls: ['./form-herramientacobros.component.scss']
})
export class FormHerramientacobrosComponent implements OnInit {

  opt:string;
  data:any = {
    tipoMoneda: "cop",
    iva: 0,
    total: 0
  };
  titulo:string = "Crear";
  formatoMoneda:any = {};
  disbleBtn:boolean = true;
  dataUser:any = {};
  id:any;

  constructor(
    private activate: ActivatedRoute,
    private _tools: ToolsService,
    private _linkCobro: LinkPagoService,
    private _store: Store<APPINT>,
    private Router: Router
  ) { 
    this._store.subscribe((store: any) => {
      console.log(store);
      store = store.name;
      if( !store ) return false;
      this.dataUser = store.user || {};
    }, error => this.Router.navigate( [ "dashboard/cobros" ] ) );
  }

  ngOnInit() {
    this.formatoMoneda = this._tools.formatoMoneda
    let dataParams:any = ( this.activate.snapshot.paramMap ); dataParams = dataParams.params;
    this.opt = dataParams.opt;
    this.id = dataParams.id || null;
    if( this.id ) this.getCobro();
    else { this.data.user = this.dataUser.id; this.data.referenceCodigo = this._tools.codigo(); }
  } 

  getCobro(){
    this._linkCobro.get( { where: { id: this.id }, limit: 1 }).subscribe(( res:any )=>{
      res = res.data[0];
      if( !res ) return this.Router.navigate( [ "dashboard/cobros" ] );; 
      console.log( res );
      this.data = res;
    }, error => this.Router.navigate( [ "dashboard/cobros" ] ) );
  }

  submit(){
    let validador:any = this.validando();
    if( !validador ) return false;
    if( this.id ) this.update();
    else this.create();
  }

  validando(){
    if( !this.data.descripcion ) { this._tools.presentToast("Error no tiene una descripcion de lo que vas a cobrar "); return false; }
    if( !this.data.precio ) { this._tools.presentToast("Error no tiene un precio "); return false; }
    if( !this.data.total ) { this._tools.presentToast("Error no en el procedimiento total "); return false; }
    return true;
  }

  create(){
    console.log( this.data );
    if( this.opt == "email" ) this.data.tipo = 0;
    if( this.opt == "link" ) this.data.tipo = 1;
    if( this.opt == "botton" ) this.data.tipo = 2;
    this._linkCobro.saved( this.data ).subscribe(( res:any )=>{
      this.disbleBtn = false;
      this._tools.presentToast( "Cobro creado exitoso" );
      this.id = res.id;
      this.data = res;
    },( error:any ) => { this._tools.presentToast( "Error de servidor"); this.disbleBtn = false; } )
  }

  update(){
    console.log( this.data );
    if( this.data.estado !== 0 ) return this._tools.presentToast("Lo sentimos no podemos actualizar el cobro");
    this.data = _.omitBy( this.data, _.isNull);
    this.data = _.omit(this.data, [ 'createdAt', 'updatedAt', 'user']);
    this._linkCobro.editar( this.data ).subscribe(( res:any )=>{
      this.disbleBtn = false;
      this._tools.presentToast( "Cobro Actualizado exitoso" );
      console.log( res );
    },( error:any ) => { this._tools.presentToast( "Error de servidor"); this.disbleBtn = false; } )
  }

  precioTotal( data ){
    let iva:number = 0;
    if( data.iva ) iva = ( Number( ( data.precio || 0 ) ) * data.iva ) / 100;
    iva = Number( iva );
    //console.log(iva, this.data );
    this.data.total = Number( ( data.precio || 0 )) + ( iva || 0 );
  }

}
