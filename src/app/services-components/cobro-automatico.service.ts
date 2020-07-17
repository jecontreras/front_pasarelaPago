import { Injectable } from '@angular/core';
import { FactoryModelsService } from '../services/factory-models.service';
import { COBROAUTOMATICO } from '../interfaces/interfasapp';

@Injectable({
  providedIn: 'root'
})
export class CobroAutomaticoService {

  constructor(
    private _model: FactoryModelsService
  ) {
    // this.cuerpo = this._model;
  }
  get(query: any){
    return this._model.querys<COBROAUTOMATICO>('cobroautomatico/querys', query, 'post');
  }
  saved (query: any){
    return this._model.querys<COBROAUTOMATICO>('cobroautomatico', query, 'post');
  }
  editar (query: any){
    return this._model.querys<COBROAUTOMATICO>('cobroautomatico/'+query.id, query, 'put');
  }
}
