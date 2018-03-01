import { Component, OnInit, ElementRef, NgZone, ViewChild } from '@angular/core';
import { SelectItem } from 'primeng/primeng';

import { BackendService } from '../services/backend.service';
import { ConfirmDialogModule, ConfirmationService, DataTable } from 'primeng/primeng';

//Gestión de Formas
import { FormControl } from "@angular/forms";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ModalModule } from "ng2-modal";
import { Message } from 'primeng/primeng';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { PARAMS } from '../services/params';

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.css']
})

export class PreciosComponent implements OnInit {

  URLDocs: string;
  //Objeto principal
  contrato: any;

  public gb: string;

  //Parámetros de alta
  cols: any[];

  unidadesDDL: any[];
  selectedUnidad: any;
  porcentaje: number;

  partidas: any[] = [];
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

    this.gb = '';
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
    //Cargar unidades
    this.busy = this.service.get('contrato/obtenerunidadesddl', {
      'idUsuario': 0,
      'idContrato': id
    }).then(
      data => {
        this.unidadesDDL = data;
      },
      error => {
        this.errorMessage = <any>error
        console.log(this.errorMessage)
      }
      );

    //Obtengo las columnas
    // this.busy = this.service.get('contrato/obtenercolumnas', {
    //   'idUsuario': 0,
    //   'idContrato': id
    // }).then(
    //   data => {
    //     this.cols = data
    //   },
    //   error => {
    //     this.errorMessage = <any>error
    //     console.log(this.errorMessage)
    //   }
    //   );
  }

  setUnidad(): void {
    let id = +this.route.snapshot.params['id'];
    //Obtengo la lista de partidas
    this.busy = this.service.get('contrato/obtenerpartidas', {
      'idUsuario': 0,
      'idUnidad': this.selectedUnidad,
      'idContrato': id
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

  saveProgress(): void {
    let id = +this.route.snapshot.params['id'];
    //Corto el JSON
    let jsonParams = []
    for (let data of this.partidas) {
      jsonParams.push({
        'id': data.idPartida,
        'v': data.venta,
        // 'p1': data.precio1,
        // 'p2': data.precio2,
        // 'p3': data.precio3,
        // 'p4': data.precio4,
        // 'p5': data.precio5,
        // 'p6': data.precio6,
        // 'p7': data.precio7,
        'pM': data.precioMano,
        'pR': data.precioRefaccion,
        'pL': data.precioLubricante,
        't': data.tiempo
      })
    }

    this.busy = this.service.post('contrato/agregarventa', {
      'idUsuario': 1,
      'idUnidad': this.selectedUnidad,
      'idContrato': id,
      'json': JSON.stringify(jsonParams)
    }).then(
      data => {
        this.msgs.push({ severity: 'success', summary: 'Éxito', detail: 'Precio Venta guardado.' });
      },
      error => {
        this.errorMessage = <any>error
        console.log(this.errorMessage)
      }
      );
  }

  aplicarPorcentaje(): void {
    if (this.porcentaje > 0 && this.porcentaje <= 100) {
      for (let _partida of this.partidas) {
        let partida: any = _partida
        partida.venta = (partida.promedio * ((this.porcentaje / 100) + 1))
      }
      this.msgs.push({ severity: 'succes', summary: 'Éxito', detail: 'Se ha aplicado el ' + String(this.porcentaje) + '% de utilidad a cada partida.' });
    }
    else {
      this.msgs.push({ severity: 'warning', summary: 'Alerta', detail: 'Establezca un porcentaje válido.' });
    }
  }

  regresar(): void {
    this.router.navigate(['/contratos'])
  }

  export(e: DataTable){
    let jsonDataTable = []
    let aux
    e.columns.forEach((c) => {
      if(c.field){
        console.log(c)
      }else{
        console.log(c.bodyTemplate)
        aux = c.bodyTemplate
        console.log(aux)
      }
    })
    
  }

  Actualizar(data: any){
    console.log(data)

    let id = +this.route.snapshot.params['id'];
    //Corto el JSON
    let jsonParams = []
    
      jsonParams.push({
        'id': data.idPartida,
        'v': data.venta,
        'p1': data.precio1,
        'p2': data.precio2,
        'p3': data.precio3,
        'p4': data.precio4,
        'p5': data.precio5,
        'p6': data.precio6,
        'p7': data.precio7,
        'pM': data.precioMano,
        'pR': data.precioRefaccion,
        'pL': data.precioLubricante,
        't': data.tiempo
      })
    

      console.log(jsonParams)
    
      this.busy = this.service.post('contrato/agregarunaventa', {
      'idUsuario': 1,
      'idUnidad': this.selectedUnidad,
      'idContrato': id,
      'json': JSON.stringify(jsonParams)
      }
        ).then(
          data =>{
            this.msgs.push({ severity: 'success', summary: 'Éxito', detail: 'Precio Venta guardado.'});
          },
          error =>{
            this.errorMessage = <any>error
            console.log(this.errorMessage)
          }
        )
  }

  onExporting(e){
    e.component.beginUpdate();
    e.component.columnOption("Acción", "visible", false);
    e.component.columnOption("Instructivo", "visible", false);
    e.component.columnOption("Foto", "visible", false);
    e.component.columnOption("Precio Venta Desglozado", "visible", false);

    e.component.columnOption("precioMano", "visible", true);
    e.component.columnOption("precioRefaccion", "visible", true);
    e.component.columnOption("precioLubricante", "visible", true);

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
    e.component.columnOption("Precio Venta Desglozado", "visible", true);

    e.component.columnOption("precioMano", "visible", false);
    e.component.columnOption("precioRefaccion", "visible", false);
    e.component.columnOption("precioLubricante", "visible", false);
    
    //Se sustituye la columna original por la columna personalizada
    e.component.columnOption("Descripción", "caption", "descripcion");
    e.component.columnOption("DescripciónAux", "caption", "Descripción");

    e.component.columnOption("Descripción", "visible", true);    
    e.component.columnOption("descripcion", "visible", false);
    e.component.endUpdate();
  }


}

