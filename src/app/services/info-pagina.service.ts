import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfoEquipo } from '../interfaces/info-equipo.interface';
import { InfoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {
  info: InfoPagina = {};
  cargando: boolean = false;
  equipo: InfoEquipo[] = [];


  constructor(private http: HttpClient) {
    this.cargarInfo();
    this.cargarEquipo();
  }

  private cargarInfo() {
    this.http.get('assets/db/db.json')
      .subscribe((resp: InfoPagina) => {
        this.cargando = true;
        this.info = resp;
      });
  }
  private cargarEquipo() {
    this.http.get('https://db-mastiius-shop-default-rtdb.firebaseio.com/equipo.json')
      .subscribe((resp: any) => {
        this.cargando = true;
        this.equipo = resp;
      });
  }
}


