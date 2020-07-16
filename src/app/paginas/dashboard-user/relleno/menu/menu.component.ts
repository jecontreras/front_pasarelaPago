import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { USER } from 'src/app/interfaces/user';
import { Store } from '@ngrx/store';
import { UserAction } from 'src/app/redux/app.actions';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public listMenu:any = [];
  dataUser:any = {};
  constructor(
    private _menu: DataService,
    private _store: Store<USER>,
  ) { 
    this._store.select("name")
    .subscribe((store:any)=>{
      this.dataUser = store.user;
    });
  }

  ngOnInit() {
    this.cargarMenu();
  }

  cargarMenu(){
    this._menu.getMenuOpts().subscribe(rta=>{
      this.listMenu = rta;
      this.listMenu = this.listMenu.filter((row:any)=> row.disabled == true );
    })
  }
  ActivarMenu( item:any ){
    //for( let row of this.listMenu ) row.check = false;
    item.check = !item.check;
  }
  loguot(){
    let accion = new UserAction( this.dataUser, 'drop');
    this._store.dispatch( accion );
    location.reload();
  }

}
