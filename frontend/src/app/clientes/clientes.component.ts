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
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})

export class ClientesComponent implements OnInit {

  clientes: any[] = [];

  //Parámetros de alta
  cols: any[];
  errorMessage: string;

  busy: Promise<any>;
  msgs: Message[] = [];

  fb: FormBuilder
  frmClientes: FormGroup;

  @ViewChild('btnClose')
  closeModal: ElementRef

  @ViewChild('btnOpen')
  openModal: ElementRef
  constructor(
    private service: BackendService,
    private confirmationService: ConfirmationService
  ) {

    this.cols = [
      { field: 'idCliente', header: 'ID' },
      { field: 'nombreComercial', header: 'Nombre Comercial' },
      { field: 'razonSocial', header: 'Razón Social' },
      { field: 'rfc', header: 'RFC' },
      { field: 'direccion', header: 'Dirección' },
      { field: 'telefono', header: 'Teléfono' }
    ];

    this.fb = new FormBuilder()
    this.frmClientes = this.fb.group({
      'idCliente': [null],
      'nombreComercial': [null, Validators.required],
      'razonSocial': [null, Validators.required],
      'rfc': [null, Validators.required],
      'direccion': [null, Validators.required],
      'telefono': [null, Validators.required]
    });

  }

  ngOnInit() {
    this.reload()
  }

  reload() {
    //Cargo la información de inicio
    this.busy = this.service.get('cliente/obtenertodos', { 'idUsuario': 0 }).then(
      data => {
        this.clientes = data
      },
      error => {
        this.errorMessage = <any>error
        console.log(this.errorMessage)
      }
    );
  }

  save(value: string): void {
    let parametros = JSON.parse(JSON.stringify(value));
    if (parametros.idCliente == null) {
      this.busy = this.service.post('cliente/agregar', parametros).then(
        data => {
          this.msgs.push({ severity: 'success', summary: 'Éxito', detail: 'Cliente agregado correctamente.' });
          this.reload()
          this.frmClientes.reset();
          this.closeModal.nativeElement.click();
        },
        error => {
          this.errorMessage = <any>error
          console.log(this.errorMessage)
        }
      );
    }
    else {
      this.busy = this.service.put('cliente/actualizar', parametros).then(
        data => {
          this.msgs.push({ severity: 'success', summary: 'Éxito', detail: 'Cliente actualizado.' });
          this.reload()
          this.frmClientes.reset();
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
      message: '¿Desea eliminar este cliente?',
      accept: () => {
        //Actual logic to perform a confirmation
        //Cargo la información de inicio
        this.busy = this.service.delete('cliente/eliminar', tipo).then(
          data => {
            this.msgs.push({ severity: 'success', summary: 'Eliminado', detail: 'Se ha eliminado el cliente.' });
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
    this.frmClientes = this.fb.group({
      'idCliente': [value.idCliente],
      'nombreComercial': [value.nombreComercial, Validators.required],
      'razonSocial': [value.razonSocial, Validators.required],
      'rfc': [value.rfc, Validators.required],
      'direccion': [value.direccion, Validators.required],
      'telefono': [value.telefono, Validators.required]
    });
    this.openModal.nativeElement.click()
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
