import { Component, OnInit, ElementRef, NgZone, ViewChild } from '@angular/core';
import { SelectItem } from 'primeng/primeng';

import { BackendService } from '../services/backend.service';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';

//Gestión de Formas
import { FormControl } from "@angular/forms";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ModalModule } from "ng2-modal";
import { Message } from 'primeng/primeng';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { PARAMS } from '../services/params';

@Component({
  selector: 'app-aprobar',
  templateUrl: './aprobar.component.html',
  styleUrls: ['./aprobar.component.css']
})

export class AprobarComponent implements OnInit {

  //Objeto principal
  cotizacion: any;
  proveedor: any = {};
  URLDocs: string

  //Parámetros de alta
  cols: any[];

  partidas: any[] = [];
  kits: any[];
  errorMessage: string;

  busy: Promise<any>;
  msgs: Message[] = [];

  @ViewChild('btnClose')
  closeModal: ElementRef

  @ViewChild('btnOpen')
  openModal: ElementRef

  constructor(
    private service: BackendService,
    private confirmationService: ConfirmationService,
    private ngZone: NgZone,
    private router: Router,
    private route: ActivatedRoute) {

      this.URLDocs = PARAMS.urlDocs + 'partidas/';
    //Inicializo las columnas
    this.cols = [
      { field: 'especialidad', header: 'Especialidad', width: '90px' },
      { field: 'clasificacion', header: 'Clasificación', width: '150px' },
      { field: 'subClasificacion', header: 'SubClasificación', width: '150px' },
      { field: '', header: 'Parte', width: '150px' },
      { field: '', header: 'Descripción', width: '150px' }
    ];

  }

  ngOnInit() {

    let id = +this.route.snapshot.params['id'];
    this.busy = this.service.get('proveedor/obtenercotizacionbyid', {
      'idProveedorCotizacion': id
    }).then(
      (data: any) => {
        this.busy = this.service.get('proveedor/obtenerbyid', {
          'idProveedor': data[0].idProveedor
        }).then(
          data => {
            this.proveedor = data[0]
          },
          error => {
            this.errorMessage = <any>error
            console.log(this.errorMessage)
          }
          );
      },
      error => {
        this.errorMessage = <any>error
        console.log(this.errorMessage)
      }
      );

    //Obtengo las columnas
    // this.busy = this.service.get('cotizacion/obtenercolumnas', {
    //   'idUsuario': 0,
    //   'idProveedorCotizacion': id
    // }).then(
    //   data => {
    //     this.cols = data
    //     //Obtengo la cotizacion
    //     //Obtengo la lista de proveedores

    //   },
    //   error => {
    //     this.errorMessage = <any>error
    //     console.log(this.errorMessage)
    //   }
    //   );

    this.busy = this.service.get('cotizacion/obtenerpartidasaprobar', {
      'idUsuario': 0,
      'idProveedorCotizacion': id
    }).then(
      data => {
        this.partidas = data;
      },
      error => {
        this.errorMessage = <any>error
        console.log(this.errorMessage)
      }
      );

  }

  aprobar(value: string): void {
    this.respuesta(JSON.parse(JSON.stringify(value)), 4)
  }

  rechazar(value: string): void {
    this.respuesta(value, 5)
  }

  respuesta(value: string, resp: number): void {
    let parametros = JSON.parse(JSON.stringify(value));
    let id = +this.route.snapshot.params['id'];
    this.busy = this.service.put('cotizacion/aprobarpartida', {
      'idUsuario': 0,
      'idProveedorCotizacion': id,
      'idPartida': parametros.idPartida,
      'respuesta': resp
    }).then(
      data => {
        this.msgs.push({ severity: 'success', summary: 'Éxito', detail: 'Partida actualizada.' });
      },
      error => {
        this.errorMessage = <any>error
        this.msgs.push({ severity: 'error', summary: 'Error', detail: this.errorMessage });
        console.log(this.errorMessage)
      }
      );
  }

  aprobarPendientes(): void {
    let id = +this.route.snapshot.params['id'];
    this.busy = this.service.put('cotizacion/aprobarpendientes', {
      'idUsuario': 0,
      'idProveedorCotizacion': id
    }).then(
      data => {
        this.msgs.push({ severity: 'success', summary: 'Éxito', detail: 'Aprobación finalizada.' });
      },
      error => {
        this.errorMessage = <any>error
        console.log(this.errorMessage)
      });

    /*let count: number = 0
    for (let _partida of this.partidas) {
      let partida: any = _partida
      if (partida.idPartidaEstatus < 4) {
        let id = +this.route.snapshot.params['id'];
        this.busy = this.service.put('cotizacion/aprobarpartida', {
          'idUsuario': 0,
          'idProveedorCotizacion': id,
          'idPartida': partida.idPartida,
          'respuesta': 4
        }).then(
          data => {
            this.msgs.push({ severity: 'success', summary: 'Éxito', detail: 'Partida actualizada.' });
          },
          error => {
            this.errorMessage = <any>error
            console.log(this.errorMessage)
          }
          );
        partida.idPartidaEstatus = 4
        count++
      }
    }
    if (count == 0) {
      this.msgs.push({ severity: 'info', summary: 'Mensaje', detail: 'No hay partidas pendientes por aprobar.' });
    }*/
  }

  activar(): void {
    let id = +this.route.snapshot.params['id'];
    this.busy = this.service.put('cotizacion/aprobarcotizacion', {
      'idUsuario': 0,
      'idProveedorCotizacion': id,
      'respuesta': 3
    }).then(
      data => {
        this.msgs.push({ severity: 'success', summary: 'Éxito', detail: 'Lista de precios activada.' });
      },
      error => {
        this.errorMessage = <any>error
        console.log(this.errorMessage)
      }
      );
  }

  regresar(): void {
    this.router.navigate(['/cotizacion'])
  }

  onExporting(e){
    e.component.beginUpdate();
    e.component.columnOption("Acción", "visible", false);
    e.component.columnOption("Instructivo", "visible", false);
    e.component.columnOption("Foto", "visible", false);
    e.component.columnOption("Costo", "visible", false);
    e.component.columnOption("costoPieza", "visible", true);
    e.component.columnOption("costoMano", "visible", true);
    
    //Se sustituye la columna personalizada por la columna original
    e.component.columnOption("Descripción", "visible", false);
    e.component.columnOption("Descripción", "caption", "DescripciónAux");    

    e.component.columnOption("descripcion", "visible", true);
    e.component.columnOption("descripcion", "caption", "Descripción");
  }

  onExported(e){
    e.component.columnOption("Acción", "visible", true);
    e.component.columnOption("Instructivo", "visible", true);
    e.component.columnOption("Foto", "visible", true);
    e.component.columnOption("Costo", "visible", true);
    e.component.columnOption("costoPieza", "visible", false);
    e.component.columnOption("costoMano", "visible", false);
    
    //Se sustituye la columna original por la columna personalizada
    e.component.columnOption("Descripción", "caption", "descripcion");
    e.component.columnOption("DescripciónAux", "caption", "Descripción");

    e.component.columnOption("Descripción", "visible", true);    
    e.component.columnOption("descripcion", "visible", false);

    e.component.endUpdate();
  }
}

