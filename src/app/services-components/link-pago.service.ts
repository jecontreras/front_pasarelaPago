import { Injectable } from '@angular/core';
import { FactoryModelsService } from '../services/factory-models.service';
import { LINKCOBRO } from '../interfaces/interfasapp';

@Injectable({
  providedIn: 'root'
})
export class LinkPagoService {

  constructor(
    private _model: FactoryModelsService
  ) {
  }
  get(query: any){
    return this._model.querys<LINKCOBRO>('linkcobro/querys', query, 'post');
  }
  saved (query: any){
    return this._model.querys<LINKCOBRO>('linkcobro', query, 'post');
  }
  editar (query: any){
    return this._model.querys<LINKCOBRO>('linkcobro/'+query.id, query, 'put');
  }
  delete (query: any){
    return this._model.querys<LINKCOBRO>('linkcobro/'+query.id, query, 'delete');
  }
}