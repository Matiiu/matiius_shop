import { APP_BASE_HREF } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoDescripcion } from 'src/app/interfaces/info-producto-interface';
import { InfoPaginaService } from 'src/app/services/info-pagina.service';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  producto: ProductoDescripcion = {};
  id: string = '';
  date = new Date().getFullYear();
  params: any = '';


  constructor(
    private route: ActivatedRoute,
    public _producto: ProductosService,
    public _info: InfoPaginaService,) { }


  ngOnInit(): void {
    this.route.params
      .subscribe(params => {
        this._producto.getProducto(params['id'])
          .subscribe((producto: any) => {
            this.id = params['id']
            this.producto = producto
          })
      });

  }
}
