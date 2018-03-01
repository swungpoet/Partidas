import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/primeng';

import { BackendService } from '../services/backend.service';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';

import { ModalModule } from "ng2-modal";

import { Message } from 'primeng/primeng';

import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.component.html',
  styleUrls: ['./contratos.component.css']
})

export class ContratosComponent implements OnInit {

  contratos: any[];
  cols: any[];
  errorMessage: string;
  columnOptions: SelectItem[];

  busy: Promise<any>;
  msgs: Message[] = [];

  constructor(
    private service: BackendService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }

  ngOnInit() {
    //Cargo la información de inicio
    this.busy = this.service.get('contrato/obtenertodos', { 'idUsuario': 0 }).then(
      data => this.contratos = data,
      error => {
        this.errorMessage = <any>error
        console.log(this.errorMessage)
      }
    );

    this.cols = [
      { field: 'idContrato', header: 'ID', width: '30px' },
      { field: 'cliente', header: 'Cliente', width: '200px' },
      { field: 'folioLicitacion', header: 'Folio Lic.', width: '100px' },
      { field: 'nombreLicitacion', header: 'Nombre Lic.', width: '250px' },
      { field: 'numeroContrato', header: 'Numero Contrato.', width: '100px' },
      { field: 'descripcionContrato', header: 'Descripcion Contrato.', width: '250px' },
      { field: 'fechaInicioTXT', header: 'Inicio', width: '90px' },
      { field: 'fechaFinTXT', header: 'Inicio', width: '90px' },
      { field: 'unidades', header: 'Unidades', width: '60px' },
      { field: 'proveedores', header: 'Proveedores', width: '60px' }
    ];

    this.columnOptions = [];
    for (let i = 0; i < this.cols.length; i++) {
      this.columnOptions.push({ label: this.cols[i].header, value: this.cols[i] });
    }
  }


  //Edita un contrato
  editar(object: any): void {
    this.router.navigate(['/nuevocontrato', object.idContrato])
  }

  //Funcion para eliminar
  Eliminar() {
    this.confirmationService.confirm({
      message: '¿Desea eliminar esta licitación?',
      accept: () => {
        //Actual logic to perform a confirmation
      }
    });
  }

  zonas(value: any): void {
    this.router.navigate(['/proveedorzona', value.idContrato])
  }

  precios(value: any): void {
    this.router.navigate(['/precios', value.idContrato])
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
