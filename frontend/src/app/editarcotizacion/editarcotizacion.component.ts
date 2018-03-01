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
  selector: 'app-editarcotizacion',
  templateUrl: './editarcotizacion.component.html',
  styleUrls: ['./editarcotizacion.component.css']
})

export class EditarCotizacionComponent implements OnInit {

  URLDocs: string;
  //Objeto principal
  cotizacion: any;

  //Parámetros de alta
  cols: any[];

  unidad: any = {};
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
      data => {
        this.busy = this.service.get('unidad/obtenerunidadbyid', {
          'idUnidad': data[0].idUnidad
        }).then(
          data => {
            this.unidad = data[0];
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

    //Obtengo las partidas
    this.busy = this.service.get('cotizacion/obtenerpartidas', {
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

    //Obtengo los kits
    this.busy = this.service.get('kit/obtenerkits', {
      'idUsuario': 0,
      'idProveedorCotizacion': id
    }).then(
      data => {
        this.kits = data;
      },
      error => {
        this.errorMessage = <any>error
        console.log(this.errorMessage)
      }
      );
  }

  saveProgress(): void {
    this.busy = this.service.post('cotizacion/agregarcostoceros', {
      'idProveedorCotizacion': +this.route.snapshot.params['id'],
      'idUsuario': 1
    }).then(
      data => {
        this.msgs.push({ severity: 'success', summary: 'Éxito', detail: 'Costos de partida guardados.' });
        //Agrega costo de kits
        // this.busy = this.service.post('kit/agregarcosto', {
        //   'idProveedorCotizacion': +this.route.snapshot.params['id'],
        //   'idUsuario': 1,
        //   'json': JSON.stringify(this.kits)
        // }).then(
        //   data => {
        //     this.msgs.push({ severity: 'success', summary: 'Éxito', detail: 'Costos de kits guardados.' });
        //    // this.router.navigate(['/cotizar'])
        //   },
        //   error => {
        //     this.errorMessage = <any>error
        //     console.log(this.errorMessage)
        //   }
        //   );
      },
      error => {
        this.errorMessage = <any>error
        console.log(this.errorMessage)
      }
      );

  }

  Actualizar(data: any): void {
    
    this.busy = this.service.post('cotizacion/agregaruncosto', {
      'idProveedorCotizacion': +this.route.snapshot.params['id'],
      'idUsuario': 1,
      'idPartida': data.idPartida,
      'costoPieza': data.costoPieza,
      'costoMano': data.costoMano,
      'tiempo': data.tiempo
    }).then(
      data => {
        this.msgs.push({ severity: 'success', summary: 'Éxito', detail: 'Costo de partida guardado.' });
        //Agrega costo de kits
        // this.busy = this.service.post('kit/agregarcosto', {
        //   'idProveedorCotizacion': +this.route.snapshot.params['id'],
        //   'idUsuario': 1,
        //   'json': JSON.stringify(this.kits)
        // }).then(
        //   data => {
        //     this.msgs.push({ severity: 'success', summary: 'Éxito', detail: 'Costos de kits guardados.' });
        //    // this.router.navigate(['/cotizar'])
        //   },
        //   error => {
        //     this.errorMessage = <any>error
        //     console.log(this.errorMessage)
        //   }
        //   );
      },
      error => {
        this.errorMessage = <any>error
        console.log(this.errorMessage)
      }
      );

  }

  send(): void {
    let id = +this.route.snapshot.params['id'];
    //Envío la cotización a aprobar
    this.busy = this.service.put('cotizacion/enviaraprobacion', {
      'idUsuario': 0,
      'idProveedorCotizacion': id
    }).then(
      data => {
        this.msgs.push({ severity: 'success', summary: 'Éxito', detail: 'Cotización enviada a aprobación.' });
      },
      error => {
        this.errorMessage = <any>error
        console.log(this.errorMessage)
      }
      );
  }

  regresar(): void {
    this.router.navigate(['/cotizar'])
  }

  onExporting(e){
    e.component.beginUpdate();
    e.component.columnOption("Acción", "visible", false);
    e.component.columnOption("Instructivo", "visible", false);
    e.component.columnOption("Foto", "visible", false);
    
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
    
    //Se sustituye la columna original por la columna personalizada
    e.component.columnOption("Descripción", "caption", "descripcion");
    e.component.columnOption("DescripciónAux", "caption", "Descripción");

    e.component.columnOption("Descripción", "visible", true);    
    e.component.columnOption("descripcion", "visible", false);

    e.component.endUpdate();
  }

}

