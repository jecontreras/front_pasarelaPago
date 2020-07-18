import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CobroAutomaticoService } from 'src/app/services-components/cobro-automatico.service';
import { APPINT } from 'src/app/interfaces/interfasapp';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { ToolsService } from 'src/app/services/tools.service';
import { IdiomasService } from 'src/app/services-components/idiomas.service';
import { Router } from '@angular/router';
import { LinkPagoService } from 'src/app/services-components/link-pago.service';

@Component({
  selector: 'app-cobros',
  templateUrl: './cobros.component.html',
  styleUrls: ['./cobros.component.scss']
})
export class CobrosComponent implements OnInit {
  
  table:any = {
    header: [],
    dataRow: []
  };
  dataUser:any = {};
  query:any = { where: {  }, sort: "createdAt DESC", limit: 30 };
  notscrolly:boolean=true;
  notEmptyPost:boolean = true;
  coint:number;
  idiomas: any = {};

  constructor(
    private spinner: NgxSpinnerService,
    private _linkpago: LinkPagoService,
    private _store: Store<APPINT>,
    private _tools: ToolsService,
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
    // console.log( this.idiomas );
    this.idiomas = this._idiomas.idiomaEs;
    this.table.header = this.idiomas.tables.linkCobro.header;
    this.query.where.user = this.dataUser.id;
    this.getRow()
  }

  onScroll(){
    if (this.notscrolly && this.notEmptyPost) {
       this.notscrolly = false;
       this.query.page++;
       this.getRow();
     }
   }

   openHerramientaCobro( opt:string, item:any ){
    console.log( item );
    if( !item ) this.Router.navigate( [ "dashboard/formherramientacobros", opt ] );
    else {
      if( item.tipo == 0 ) opt = "email";
      if( item.tipo == 1 ) opt = "link";
      if( item.tipo == 2 ) opt = "botton";
      this.Router.navigate( [ "dashboard/formherramientacobros", opt, item.id ] );
    }
  }

   getRow(){
    this.spinner.show();
    this._linkpago.get( this.query ).subscribe(( res:any )=>{
      console.log( res );
      if (res.data.length === 0 ) this.notEmptyPost =  false;
      this.spinner.hide();
      this.table.dataRow = _.unionBy(this.table.dataRow || [], res.data, 'id');
    },( error )=> { this.spinner.hide(); this._tools.presentToast("Error de servidor"); } );
  }

}
