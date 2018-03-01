import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { SelectItem } from 'primeng/primeng';

import { BackendService } from '../services/backend.service';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';

//Gestión de Formas
import { FormControl } from "@angular/forms";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { ModalModule } from "ng2-modal";
import { Message } from 'primeng/primeng';

@Component({
  selector: 'app-licitaciones',
  templateUrl: './licitaciones.component.html',
  styleUrls: ['./licitaciones.component.css']
})

export class LicitacionesComponent implements OnInit {

  licitaciones: any[] = [];
  clientes: any[];
  empresasDDL: any[]
  isDisabled: boolean

  //Parámetros de alta
  cols: any[];
  errorMessage: string;

  busy: Promise<any>;
  msgs: Message[] = [];

  fb: FormBuilder
  frmLicitacion: FormGroup;

  @ViewChild('btnClose')
  closeModal: ElementRef

  @ViewChild('btnOpen')
  openModal: ElementRef
  constructor(
    private service: BackendService,
    private confirmationService: ConfirmationService
  ) {

    this.cols = [
      { field: 'idLicitacion', header: 'ID', width: '50px' },
      { field: 'cliente', header: 'Cliente' , width: '150px'},
      { field: 'clienteFinal', header: 'Cliente Final' , width: '150px'},
//      { field: 'idEmpresa', header: 'Empresa', width: '150px'},
      { field: 'folio', header: 'Folio', width: '150px' },
      { field: 'nombre', header: 'Nombre', width: '200px' },
      { field: 'descripcion', header: 'Descripción', width: '300px' },
      { field: 'fechaInicioCompleta', header: 'Fecha de Inicio' , width: '100px'}
    ];

    this.fb = new FormBuilder()
    this.frmLicitacion = this.fb.group({
      'idLicitacion': [null],
      'idCliente': [null, Validators.required],
      'idClienteFinal': [null, Validators.required],
      'idEmpresa':[null, Validators.required],
      'folio': [null, Validators.required],
      'nombre': [null, Validators.required],
      'descripcion': [null],
      'fechaInicio': [null, Validators.required]
    });

  }

  ngOnInit() {
    this.reload()
  }

  reload() {
    this.isDisabled = false
    //Cargo la información de inicio
    this.busy = this.service.get('licitacion/obtenertodas', { 'idUsuario': 0 }).then(
      data => {
        this.licitaciones = data
      },
      error => {
        this.errorMessage = <any>error
        console.log(this.errorMessage)
      }
    );

    this.busy = this.service.get('cliente/obtenertodosddl', { 'idUsuario': 0 }).then(
      data => {
        this.clientes = data
      },
      error => {
        this.errorMessage = <any>error
        console.log(this.errorMessage)
      }
    );

    this.busy = this.service.get('contrato/obtenerempresaddl', {}).then(
      data => this.empresasDDL = data,
      error => {
        this.errorMessage = <any>error
        console.log(this.errorMessage)
      }
    );
  }

  save(value: string): void {
    let parametros = JSON.parse(JSON.stringify(value));
    if (parametros.idLicitacion == null) {
      this.busy = this.service.post('licitacion/agregar', parametros).then(
        data => {
          this.msgs.push({ severity: 'success', summary: 'Éxito', detail: 'Licitación agregada correctamente.' });
          this.reload()
          this.frmLicitacion.reset();
          this.closeModal.nativeElement.click();
        },
        error => {
          this.errorMessage = <any>error
          console.log(this.errorMessage)
        }
      );
    }
    else {
      this.busy = this.service.put('licitacion/actualizar', parametros).then(
        data => {
          this.msgs.push({ severity: 'success', summary: 'Éxito', detail: 'Licitación actualizada.' });
          this.reload()
          this.frmLicitacion.reset();
          this.closeModal.nativeElement.click();
        },
        error => {
          this.errorMessage = <any>error
          console.log(this.errorMessage)
        }
      );
    }
  }

  //Funcion para eliminar
  eliminar(tipo: any): void {
    this.confirmationService.confirm({
      message: '¿Desea eliminar esta licitación?',
      accept: () => {
        //Actual logic to perform a confirmation
        //Cargo la información de inicio
        this.busy = this.service.delete('licitacion/eliminar', tipo).then(
          data => {
            this.msgs.push({ severity: 'success', summary: 'Eliminado', detail: 'Se ha eliminado la licitación.' });
            this.reload();
          },
          error => {
            this.errorMessage = <any>error
            console.log(this.errorMessage)
          }
        );
      }
    });
  }

  openEditar(value: any) {
    this.frmLicitacion = this.fb.group({
      'idLicitacion': [value.idLicitacion],
      'idCliente': [value.idCliente, Validators.required],
      'idClienteFinal': [value.idClienteFinal, Validators.required],
      'idEmpresa': [value.idEmpresa, Validators.required],
      'folio': [value.folio, Validators.required],
      'nombre': [value.nombre, Validators.required],
      'descripcion': [value.descripcion],
      'fechaInicio': [new Date(value.fechaInicio), Validators.required]
    });
    
    this.openModal.nativeElement.click()
  }

  onOpenModal() {
    if(this.frmLicitacion.controls['idLicitacion'].value == null){
      this.isDisabled = false
    }else{
      this.isDisabled = true
    }
    
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
