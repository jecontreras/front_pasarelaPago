import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { USER } from '../interfaces/user';
import { Store } from '@ngrx/store';
import { IP } from '../interfaces/interfasapp';

declare var io: any;
const headers = new HttpHeaders({
  'X-Api-Key': ""
});

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class FactoryModelsService {
  
  public sock: any;
  public disable_reconect: boolean = false;
  public interval:any;
  dataUser:any = {};
  constructor(
    private http: HttpClient,
    private _store: Store<USER>,
  ) { 
    this.conectionSocket();
    this.createsocket("emitir", {mensaje:"inicial"}); 
    this._store.select("name")
    .subscribe((store:any)=>{
      //console.log(store);
      this.dataUser = store.user;
    });
    
  }

  private ejecutarQuery<T>(url: string, data, METODO){
    return this.http[METODO]<T>( url, data );
  }

  querys<Interfas>(query:string, datas:any, METODO:string){
    let data = datas;
    if(METODO === 'get' || METODO === 'post'){
      data.page = datas.page ? datas.page : 0;
      data.limit = datas.limit ? datas.limit : 10;
      if(!data.where) data.where={};
    }
    query = URL+`/${query}`;
    return this.ejecutarQuery<Interfas>(query, data, METODO);
  }

  querysHttp<Interfas>(query:string, datas:any, METODO:string){
    let data = datas;
    if(METODO === 'get' || METODO === 'post'){
      data.page = datas.page ? datas.page : 0;
      data.limit = datas.limit ? datas.limit : 10;
      if(!data.where) data.where={};
    }
    query = `${query}`;
    return this.ejecutarQuery<Interfas>(query, data, METODO);
  }

  miIp(){
    return this.ejecutarQuery<IP>(`https://api.ipify.org/?format=jsonp&callback=get_ip`, {}, 'get');
  }

  async createsocket(modelo: string, query: any) {
      return new Promise(async (promesa) => {
        query.modelo = modelo;
        await this.sock.post(URL + '/socket/emitir', query, (rta) => {
          // console.log(rta, modelo);
          promesa(rta)
        });
        promesa("exitoso");
      })

  }
  init_process_socket() {
    let
      init: any = 0
    ;
    this.interval = setInterval(() => {
      init += 1;
      if (init === 3) {
        init = 0;
        if(this.disable_reconect) {
          this.conectionSocket();
        }
      }
    }, 1000);
  }
  stopConter(interval: any) {
    clearInterval(interval);
  }
  /* Primera la conexion de configuracion del socket */
  conectionSocket() {
    try {
      if (io) {
        io.sails.autoConnect = false;
        this.sock = io.sails.connect(URL);
        this.scoket_global();
      }
    } catch (error) {
    }
  }
  scoket_global() {
    /* determinar  la conexion del socket con el back  */
    this.sock.on('connect',() => {
      console.log('conectado');
      this.disable_reconect = false;
      this.stopConter(this.interval);
    });
    /* Reconectar si se cae la conexion del socket */
    this.sock.on('disconnect', () =>{
      console.log('desconectado');
      this.disable_reconect = true;
      this.init_process_socket()
    });
  }
}
