import { Component, OnInit } from '@angular/core';
import { LinkPagoService } from 'src/app/services-components/link-pago.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-link-cobros',
  templateUrl: './link-cobros.component.html',
  styleUrls: ['./link-cobros.component.scss']
})
export class LinkCobrosComponent implements OnInit {
  
  vista:any = "procesando";
  error:string;
  paramasData:any;

  constructor(
    private _linkPago: LinkPagoService,
    private activate: ActivatedRoute,
    private Router: Router
  ) { }

  ngOnInit() {
    this.paramasData = this.activate.snapshot.paramMap.get( "idLink" );
    this.getLinkCobro();
  }
  
  getLinkCobro(){
    this._linkPago.get( { where: { id: this.paramasData.id, estado: { "!=": 3 }} } ).subscribe( ( res:any )=>{
      res = res.data[0];
      if( !res ) { this.vista="error"; this.error = "Error link no encontrado"; return false; };
      if( res.estado == 1 ) { this.vista="error"; this.error = "Error link ya fue pagado"; return false; };
      if( res.estado == 2 ) { this.vista="error"; this.error = "Error link fue cancelado por favor comunicar con el cobrante"; return false; };
      if( res.estado == 3) { this.vista="error"; this.error = "Error link fue eliminado por el cobrante"; return false; };
      this.Router.navigate( [ "pagos/index", res.user.id, res.descripcion, res.precio, res.iva, res.id ] );
    } , error => { this.vista="error"; this.error = "Error de servidor"; })
  }

  volverInicio(){
    this.Router.navigate( [ "pagos/informacion" ] );
  }

}
