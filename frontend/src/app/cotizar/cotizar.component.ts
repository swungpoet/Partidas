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

import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-cotizar',
  templateUrl: './cotizar.component.html',
  styleUrls: ['./cotizar.component.css']
})

export class CotizarComponent implements OnInit {

  user: any = {};
  //Parámetros de alta
  cols: any[];

  proveedoresDDL: any[];
  cotizaciones: any[];
  errorMessage: string;
  selectedProveedor: any;

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
    public auth: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router) {

    //Inicializo las columnas
    this.cols = [
      { field: 'idProveedorCotizacion', header: 'ID' },
      { field: 'fechaTXT', header: 'Fecha' },
      { field: 'tipoCombustible', header: 'TipoCombustible', width: '120px' },
      { field: 'tipoUnidad', header: 'Clase', width: '150px' },
      { field: 'marca', header: 'Marca', width: '200px' },
      { field: 'subMarca', header: 'SubMarca', width: '300px' },
      { field: 'cilindros', header: 'Cilindros', width: '120px' },
      { field: 'estatus', header: 'Estatus' }

    ];

  }

  ngOnInit() {

    this.user = JSON.parse(this.auth.getUser());
    //Obtengo la lista de proveedores
    this.busy = this.service.get('proveedor/obtenertodosddl', { 'idUsuario': 0 }).then(
      data => {
        this.proveedoresDDL = data;
        
        let id = +this.route.snapshot.params['id'];
        if(!isNaN(id)){
          this.selectedProveedor = id
          this.setProveedor()
        }
      },
      error => {
        this.errorMessage = <any>error
        console.log(this.errorMessage)
      }
    );

  }

  setProveedor(): void {
    this.busy = this.service.get('cotizacion/obtenerunidades', { 'idUsuario': 0, 'idProveedor': this.selectedProveedor }).then(
      data => {
        this.cotizaciones = data;
      },
      error => {
        this.errorMessage = <any>error
        console.log(this.errorMessage)
      }
    );
  }

  cotizar(cotizacion: any) {
    this.router.navigate(['/editarcotizacion', cotizacion.idProveedorCotizacion])
  }

  onOpenModal() {

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

