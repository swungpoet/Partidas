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
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.css']
})

export class CotizacionComponent implements OnInit {
  
  URLDocs: string;
  //Parámetros de alta
  cols: any[];

  unidadesDDL: any[];
  unidad: any;
  cotizaciones: any[];
  errorMessage: string;
  selectedUnidad: any;

  //Selección de proveedores
  selectedProveedores: any[] = [];
  proveedoresLIST: any[];

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
    private router: Router) {

    this.URLDocs = PARAMS.urlDocs + 'partidas/';
    this.unidad = {};
    //Inicializo las columnas
    this.cols = [
      { field: 'idProveedorCotizacion', header: 'ID', width: '50px' },
      { field: 'razonSocial', header: 'Proveedor', width: '300px' },
      { field: 'categoria', header: 'Categoría', width: '80px' },
      { field: 'fechaTXT', header: 'Fecha Solicitud', width: '120px' },
      { field: 'estatus', header: 'Estatus', width: '100px' }
    ];

  }

  ngOnInit() {

    //Obtengo la lista de unidades
    this.busy = this.service.get('unidad/obtenerunidadddl', { 'idUsuario': 0 }).then(
      data => {
        this.unidadesDDL = data;
      },
      error => {
        this.errorMessage = <any>error
        console.log(this.errorMessage)
      }
    );

  }

  setUnidad(): void {
    this.busy = this.service.get('unidad/obtenerunidadbyid', {
      'idUnidad': this.selectedUnidad
    }).then(
      data => {
        this.unidad = data[0];
      },
      error => {
        this.errorMessage = <any>error
        console.log(this.errorMessage)
      }
      );
    this.busy = this.service.get('cotizacion/obtenercotizaciones', { 'idUsuario': 0, 'idUnidad': this.selectedUnidad }).then(
      data => {
        this.cotizaciones = data;
      },
      error => {
        this.errorMessage = <any>error
        console.log(this.errorMessage)
      }
    );

    this.busy = this.service.get('cotizacion/obtenerproveedorfaltante', { 'idUsuario': 0, 'idUnidad': this.selectedUnidad }).then(
      data => {
        this.proveedoresLIST = data;
      },
      error => {
        this.errorMessage = <any>error
        console.log(this.errorMessage)
      }
    );
  }

  onOpenModal() {

  }

  save() {
    this.busy = this.service.post('cotizacion/agregar', {
      'idUsuario': 0,
      'idUnidad': this.selectedUnidad,
      'json': JSON.stringify(this.selectedProveedores)
    }).then(
      data => {
        this.msgs.push({ severity: 'success', summary: 'Éxito', detail: 'Proveedor(es) agregado(s) correctamente.' });
        this.selectedProveedores = [];
        this.closeModal.nativeElement.click();
        this.setUnidad()
      },
      error => {
        this.errorMessage = <any>error
        console.log(this.errorMessage)
      }
      );
  }

  aprobar(value: any): void {
    let parametros = JSON.parse(JSON.stringify(value));
    if (parametros.idCotizacionEstatus >= 2) {
      this.router.navigate(['/aprobar', value.idProveedorCotizacion])
    }
    else {
      this.msgs.push({ severity: 'warning', summary: 'Alerta', detail: 'El proveedor no ha cotizado ningún item de esta lista de precios.' });
    }
  }

  cancelar(value: any): void {

  }

  onExporting(e){
    e.component.beginUpdate();
    e.component.columnOption("Acción", "visible", false);
  }

  onExported(e){
    e.component.columnOption("Acción", "visible", true);
    e.component.endUpdate();
  }
}

