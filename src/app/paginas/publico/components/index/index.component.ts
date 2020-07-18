import { Component, OnInit } from '@angular/core';
import { IdiomasService } from 'src/app/services-components/idiomas.service';
import { ToolsService } from 'src/app/services/tools.service';
import { Indicativo } from 'src/app/JSON/indicativo';
import { DEPARTAMENTO } from 'src/app/JSON/departamentos';
import { DomSanitizer } from '@angular/platform-browser';
import { FactoryModelsService } from 'src/app/services/factory-models.service';
import { ActivatedRoute } from '@angular/router';
import { UsuariosService } from 'src/app/services-components/usuarios.service';
import { CobroAutomaticoService } from 'src/app/services-components/cobro-automatico.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  // select Idioma
  foods:any = [
    {
      value: "Es",
      name: "Español"
    },
    {
      value: "En",
      name: "Ingles"
    }
  ];
  // lista de idioma
  idioma:any = {};
  value = '';
  //recolectando informacion
  data:any = {
    nombreTitular: "jose contreras",
    documento: "111231",
    metodo: "Viza",
    ref:"1000011",
    fecha: "08/06/2020",
    estado: "Aceptado-Aprobada",
    ref_pagp: "222222",
    recibo: "222222",
    total: 4444444
  };
  // lista de medios de pagos
  listMedios:any = [];
  listSeleccionPago:any = {};
  // detalles del pago
  paramsInforPago:any = {
    // subtotal: 2000,
    // taxes: 100,
    // total: 21000,
    // comercio: "JOSE CONTRERAS",
    // llamenos: "+573228576900",
    // escribanos: "JOSEEDUAR147@GMAIL.COM",
    // urlRespuesta: "https://dilisaplive.000webhostapp.com/",
    // descripcion: "Pauete para personas principiantes"
    
  };
  //vistas
  vista:string = "inicio";
  disabled:any = {
    vistas1: true,
    vistas2: true,
    vistas3: true
  };
  // lista de select
  listCuotas:any = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36];
  listTipoCc:any = ["CC","NIT","CE","PPN","SSN","LIC","DNI"]
  listIndicativos:any = Indicativo;

  btnDisableSubmit:boolean = false;

  listDepartamento:any = DEPARTAMENTO;
  listCiudad:any = [];
  url:any;
  validadorData:any = {};
  dataParmas:any = {};
  query:any = {
    where:{}
  };
  formatoMoneda:any;
  error:string;

  constructor(
    private _idiomas: IdiomasService,
    private _tools: ToolsService,
    public sanitizer: DomSanitizer,
    private _model: FactoryModelsService,
    private activate: ActivatedRoute,
    private _user: UsuariosService,
    private _cobroAutomatico: CobroAutomaticoService
  ) {
    //console.log( this._idiomas );
    this.idioma = this._idiomas.idiomaEs;
   }

  ngOnInit() {
    this.formatoMoneda = this._tools.formatoMoneda;
    let dataParams:any = ( this.activate.snapshot.paramMap ); dataParams = dataParams.params;
    console.log( dataParams );
    this.dataParmas= dataParams;
    this.Iniciando();
    this.listMedios = [
      // {
      //   medio: "PRODUCTOS DAVIVIENDA",
      //   descripcion: "Pague Fácil, Rápido y Seguro",
      //   foto: "./assets/imagenes/product.jpg"
      // },
      {
        medio: "Tarjeta de Crédito y Débito",
        descripcion: "Pague Fácil, Rápido y Seguro",
        foto: "./assets/imagenes/product.jpg",
        titulo: "Información de la tarjeta"
      },
      {
        medio: "PSE (Cuentas de ahorro y corriente)",
        descripcion: "Pague Fácil, Rápido y Seguro",
        foto: "./assets/imagenes/product.jpg"
      },
      // {
      //   medio: "Daviplata",
      //   descripcion: "Pague Fácil, Rápido y Seguro",
      //   foto: "./assets/imagenes/product.jpg"
      // },
      {
        medio: "Efectivo",
        descripcion: "Pague Fácil, Rápido y Seguro",
        foto: "./assets/imagenes/product.jpg"
      },
    ];
    //this.getMiIp();
  }

  async Iniciando(){
    this.query.where.id = this.dataParmas.idComercio;
    let validando:boolean = await this.validandoParams();
    if( !validando ) { return false; }
    let result:any = await this.getComercio();
    if( !result ) { this.error="Comercio no registrado"; this.vista = "error"; return false; }
    this.paramsInforPago = {
      subtotal: Number( ( this.dataParmas.total || 0 )) - Number( ( this.dataParmas.impuestos || 0 )),
      taxes: this.dataParmas.impuestos,
      total: this.dataParmas.total,
      comercio: result.empresa.titulo,
      llamenos: result.celular,
      escribanos: result.email,
      urlRespuesta: result.empresa.urlPagina || "https://dilisaplive.000webhostapp.com/",
      descripcion: this.dataParmas.descripcion,
      id: result.empresa.id
    };
  }

  validandoParams(){
    if( !this.dataParmas.idComercio ) { this._tools.presentToast("Undefined idcomercio"); this.vista = "error"; this.error="IdComercio"; return false; }
    if( !this.dataParmas.descripcion ) { this._tools.presentToast("Undefined descripcion"); this.vista = "error"; this.error="descripcion"; return false; }
    if( !this.dataParmas.impuestos ) { this._tools.presentToast("Undefined impuesto"); this.vista = "error"; this.error="impuesto"; return false; }
    if( !this.dataParmas.total ) { this._tools.presentToast("Undefined total"); this.vista = "error"; this.error="total"; return false; }
    return true;
  }

  async getComercio(){
    return new Promise( resolve =>{
      this._user.get( this.query ).subscribe( ( res:any )=>{
        res = res.data[0];
        if( !res ) return resolve( false );
        else resolve( res );
      },error=> resolve( false ) );
    });
  }

  getMiIp(){
    this._model.miIp().subscribe(( row:any )=> {
      console.log( row );
    });
  }

  departamentoSelect( ){
    console.log( this.data );
    let filtro:any = this.listDepartamento.find( ( row:any )=> row.departamento == this.data.billingDepartamento );
    if( !filtro ) return false;
    this.listCiudad = filtro.ciudades;
  }
  
  async siguienteView(){
    this.data.total = this.paramsInforPago.total;
    this.data.referenceCode = this._tools.codigo();
    let validando:boolean = this.validandoData();
    console.log( validando );
    if( !validando ) return false;
    this.vista = "pago";
    let result:any = await this.creandoOrden();
    if( !result ) return this._tools.presentToast("Error con el servidor por favor intentarlo de nuevo");
    window.open(`http://localhost:8080/zafiro?referenceCode=${ this.data.referenceCode }&purchaseAmount=${ this.data.total }&purchaseIpAddress=192.0.0.1&purchaseQuotaId=001&billingFirstName=${ this.data.billingFirstName }&billingLastName=${ this.data.billingLastName }&billingCity=${ this.data.billingCity }&billingAddress=${ this.data.billingAddress }&billingCelPhoneNumber=${ this.data.billingCelPhoneNumber }&billingPhoneNumber=575758038&billingGender=M&billingEmail=${ this.data.billingEmail }&billingNationality=CO`);
  }

  validandoData(){
    if( !this.data.total ) { this._tools.presentToast("Error no existe valor a cobrar"); this.validadorData.total = true; return false;}
    if( !this.data.billingFirstName ) { this._tools.presentToast("Error Por favor escriba tu nombre"); this.validadorData.billingFirstName = true; return false;}
    if( !this.data.billingLastName ) { this._tools.presentToast("Error Por favor escriba tu apellido"); this.validadorData.billingLastName = true; return false;}
    if( !this.data.billingCity ) { this._tools.presentToast("Error Por favor escriba tu Ciudad"); this.validadorData.billingCity = true; return false;}
    if( !this.data.billingAddress ) { this._tools.presentToast("Error Por favor escriba tu Direccion"); this.validadorData.billingAddress = true; return false;}
    if( !this.data.billingCelPhoneNumber ) { this._tools.presentToast("Error Por favor escriba tu Celular"); this.validadorData.billingCelPhoneNumber = true; return false;}
    if( !this.data.billingEmail ) { this._tools.presentToast("Error Por favor escriba tu Email"); this.validadorData.billingEmail = true; return false;}
    return true;
  }

  async creandoOrden(){
    return new Promise( resolve =>{
      let data:any = {
        precio: this.data.total,
        iva: this.paramsInforPago.taxes,
        empresa: this.paramsInforPago.id,
        descripcion: this.paramsInforPago.descripcion,
        billingFirstName: this.data.billingFirstName,
        billingLastName: this.data.billingLastName,
        purchaseIpAddress: this.data.purchaseIpAddress,
        billingCity: this.data.billingCity,
        billingCelPhoneNumber: this.data.billingCelPhoneNumber,
        billingEmail: this.data.billingEmail,
        referenceCode: this.data.referenceCode
      };
      this._cobroAutomatico.saved( data ).subscribe(( res:any )=>{
        resolve( res );
      },error => resolve( false ) );
    })
  }

  validandoTarjeta(){
    console.log(this.data.numeroTarjeta);
    let visa:any = this.data.numeroTarjeta;
    let mastercard = this.data.numeroTarjeta;
    if (!visa.match(/^4\d{3}-?\d{4}-?\d{4}-?\d{4}$/)) console.log("No es un número de Visa correcto");
    else console.log("Es correcto visa");
      
    if (!mastercard.match(/^5[1-5]\d{2}-?\d{4}-?\d{4}-?\d{4}$/)) console.log("No es un número de mastercard correcto")
    else console.log("Es correcto mastercard")
  }

  selectMedio( item:any ){
    if( !this.data.email ) return this._tools.presentToast("Primero debes instroducir un emails");
    for( let row of this.listMedios ) row.check = false;
    item.check = true;
    this.listSeleccionPago = item;
    this.vista = "detalles";
    this.disabled.vistas1 = false;
  }

  volverVista( opt:string ){
    this.vista = opt;
    if(opt == 'inicio'){
      this.disabled = {
        vistas1: true,
        vistas2: true,
        vistas3: true
      };
      this.listSeleccionPago = {};
      for( let row of this.listMedios ) row.check = false;
    }
    if( opt == 'detalles'){
      this.disabled = {
        vistas1: false,
        vistas2: true,
        vistas3: true
      }
    }
    if( opt == 'finix'){
      this.disabled = {
        vistas1: false,
        vistas2: false,
        vistas3: true
      }
    }
  }

  submitPago(){
    //this.btnDisableSubmit = true;
    this.disabled.vistas2 = false;
    this.vista = "finix";
  }

}
