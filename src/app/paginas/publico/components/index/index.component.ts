import { Component, OnInit } from '@angular/core';
import { IdiomasService } from 'src/app/services-components/idiomas.service';
import { ToolsService } from 'src/app/services/tools.service';
import { Indicativo } from 'src/app/JSON/indicativo';

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
  }
  // lista de medios de pagos
  listMedios:any = [];
  listSeleccionPago:any = {};
  // detalles del pago
  paramsInforPago:any = {
    subtotal: 2000,
    taxes: 100,
    total: 21000,
    comercio: "JOSE CONTRERAS",
    llamenos: "+573228576900",
    escribanos: "JOSEEDUAR147@GMAIL.COM",
    urlRespuesta: "https://dilisaplive.000webhostapp.com/",
    descripcion: "Pauete para personas principiantes"
    
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


  constructor(
    private _idiomas: IdiomasService,
    private _tools: ToolsService
  ) {
    console.log( this._idiomas );
    this.idioma = this._idiomas.idiomaEs;
   }

  ngOnInit() {
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
    ]
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

    this.vista = "finix";
  }

}
