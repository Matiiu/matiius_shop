import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/info-productos.interface'

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  productos: any[] = [];
  productosFiltrado: Producto[] = [];
  cargando: boolean = true;


  constructor(private http: HttpClient) {
    this.cargarProductos();

  }

  private cargarProductos() {

    return new Promise((resolve, reject) => {

      this.http.get('https://db-mastiius-shop-default-rtdb.firebaseio.com/productos_idx.json')
        .subscribe((resp: any) => {
          this.productos = resp;
          setTimeout(() => this.cargando = false, 1000);
          resolve;
        });
    });
  }

  getProducto(id: string) {
    return this.http.get(`https://db-mastiius-shop-default-rtdb.firebaseio.com/productos/${id}.json `)
  }

  buscarProducto(termino: string) {

    if (this.productos.length === 0) {
      this.cargarProductos().then(() => {
        this.filtrarProductos(termino);
      })
    } else {
      this.filtrarProductos(termino);
    }

    // this.productosFiltrado = this.productos.filter(produdto => true)
    // console.log(this.productosFiltrado)
  }
  private filtrarProductos(termino: string) {
    console.log(this.productos);
    this.productosFiltrado = [];
    termino = termino.toLowerCase();

    this.productos.forEach(prod => {
      const tituloLower = prod.titulo.toLowerCase();
      if (prod.categoria.indexOf(termino) >= 0 || tituloLower.indexOf(termino) >= 0) {
        this.productosFiltrado.push(prod);
      }
    })
  }

}
