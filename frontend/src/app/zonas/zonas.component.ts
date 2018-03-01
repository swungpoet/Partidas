import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { SelectItem } from 'primeng/primeng';

import { BackendService } from '../services/backend.service';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';

//Gestión de Formas
import { FormControl } from "@angular/forms";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { ModalModule } from "ng2-modal";
import { Message } from 'primeng/primeng';

import { TreeNode } from 'primeng/primeng';
import { fakeAsync } from '@angular/core/testing';

@Component({
  selector: 'app-zonas',
  templateUrl: './zonas.component.html',
  styleUrls: ['./zonas.component.css']
})

export class ZonasComponent implements OnInit {

  clientesDDL: SelectItem[]
  zonas: any[]
  niveles: any[]
  selectedCliente: number

  //Parámetros de alta
  cols: any[];
  errorMessage: string;

  busy: Promise<any>;
  msgs: Message[] = [];

  fb: FormBuilder
  frmNivel: FormGroup;
  frmZona: FormGroup;

  @ViewChild('btnCloseNivel')
  closeNivel: ElementRef

  @ViewChild('btnOpenNivel')
  openNivel: ElementRef

  //////////////////////
  selectedFile: TreeNode
  ///   { "label": "Resume.doc" , "expandedIcon": "fa-folder-open" , "collapsedIcon": "fa-folder"  }
  files: TreeNode[]

  showDireccion: boolean = false;

  //////////////////////

  constructor(
    private service: BackendService,
    private confirmationService: ConfirmationService
  ) {

    this.cols = [
      { field: 'etiqueta', header: 'Nivel' },
      { field: 'orden', header: 'Orden' }
    ];

    this.fb = new FormBuilder()
    this.frmNivel = this.fb.group({
      'idNivelZona': [null],
      'etiqueta': [null, Validators.required],
      'orden': [null, Validators.required]
    });

    this.frmZona = this.fb.group({
      'idNivelZona': [null],
      'idPadre': [null],
      'nombre': [null, Validators.required]
    });

  }

  ngOnInit() {
    this.reload()

    this.busy = this.service.get('cliente/obtenertodosddl', { 'idUsuario': 0 }).then(
      data => {
        this.clientesDDL = data
      },
      error => {
        this.errorMessage = <any>error
        console.log(this.errorMessage)
      }
    );


  }

  reload() {
  }

  setCliente(): void {
    //Obtengo niveles
    this.busy = this.service.get('zona/obtenerniveles', { 'idUsuario': 0, 'idCliente': this.selectedCliente }).then(
      data => {
        this.niveles = data
      },
      error => {
        this.errorMessage = <any>error
        console.log(this.errorMessage)
      }
    );

    //Obtengo Zonas
    this.busy = this.service.get('zona/obtenertodas', { 'idUsuario': 0, 'idCliente': this.selectedCliente }).then(
      data => {
        this.zonas = data
        this.files = [{
          "label": this.clientesDDL.filter(data => { return data.value == this.selectedCliente })[0].label,
          "data": 0,
          "expandedIcon": "fa-folder-open",
          "collapsedIcon": "fa-folder",
          "expanded": true,
          "children": []
        }]
        //Nivel 1
        for (let level1 of this.zonas.filter(data => { return data.nivel == 1 })) {
          this.files[0].children.push(<TreeNode>{
            "label": level1.nombre,
            "data": level1.idZona,
            "expandedIcon": "fa-folder-open",
            "collapsedIcon": "fa-folder",
            "children": []
          });
          //Nivel 2
          for (let level2 of this.zonas.filter(data => { return data.nivel == 2 })) {
            if (level1.idZona == level2.idPadre) {
              this.files[0].children.filter(data => { return data.data == level1.idZona })[0].children.push(<TreeNode>{
                "label": level2.nombre,
                "data": level2.idZona,
                "expandedIcon": "fa-folder-open",
                "collapsedIcon": "fa-folder",
                "children": []
              });
              //Nivel 3
              for (let level3 of this.zonas.filter(data => { return data.nivel == 3 })) {
                if (level2.idZona == level3.idPadre) {
                  this.files[0].children.filter(data => { return data.data == level1.idZona })[0].children.filter(data => { return data.data == level2.idZona })[0].children.push(<TreeNode>{
                    "label": level3.nombre,
                    "data": level3.idZona,
                    "expandedIcon": "fa-folder-open",
                    "collapsedIcon": "fa-folder",
                    "children": []
                  });
                  //Nivel 4
                  for (let level4 of this.zonas.filter(data => { return data.nivel == 4 })) {
                    if (level3.idZona == level4.idPadre) {
                      this.files[0].children.filter(data => { return data.data == level1.idZona })[0].children.filter(data => { return data.data == level2.idZona })[0].children.filter(data => { return data.data == level3.idZona })[0].children.push(<TreeNode>{
                        "label": level4.nombre,
                        "data": level4.idZona,
                        "expandedIcon": "fa-folder-open",
                        "collapsedIcon": "fa-folder",
                        "children": []
                      });
                    }
                  }
                }
              }

            }
          }
        }
      },
      error => {
        this.errorMessage = <any>error
        console.log(this.errorMessage)
      }
    );

  }

  onOpenNivel() {

  }

  save(value: string): void {
    let parametros = JSON.parse(JSON.stringify(value));
    //Filtro el elemento seleccionado
    parametros.idPadre = this.selectedFile.data
    if (((this.zonas.filter(object => { return object.idZona == this.selectedFile.data })[0] != null) ? this.zonas.filter(object => { return object.idZona == this.selectedFile.data })[0].nivel : 0) < this.niveles.length) {
      if (parametros.idPadre != 0)
        parametros.idNivelZona = this.niveles.filter(object => { return object.orden == (Number(this.zonas.filter(object => { return object.idZona == this.selectedFile.data })[0].nivel) + 1) })[0].idNivelZona
      else
        parametros.idNivelZona = this.niveles.filter(object => { return object.orden == 1 })[0].idNivelZona

      this.busy = this.service.post('zona/agregar', parametros).then(
        data => {
          this.msgs.push({ severity: 'info', summary: 'Éxito', detail: 'Zona agregado correctamente.' });
          this.setCliente()
          this.frmZona.reset();
        },
        error => {
          this.errorMessage = <any>error
          console.log(this.errorMessage)
        }
      );
    }
    else {
      this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No puede agregar una zona en el último nivel.' });
    }

  }

  saveNivel(value: string): void {
    let parametros = JSON.parse(JSON.stringify(value));
    parametros.idCliente = this.selectedCliente
    this.busy = this.service.post('zona/agregarnivel', parametros).then(
      data => {
        alert('Nivel agregado correctamente.');
        this.setCliente()
        this.frmNivel.reset();
      },
      error => {
        this.errorMessage = <any>error
        console.log(this.errorMessage)
      }
    );

  }

  //Funcion para eliminar
  eliminarNivel(tipo: any): void {
    if (confirm('¿Desea eliminar este nivel?')) {
      //Actual logic to perform a confirmation
      //Cargo la información de inicio
      this.busy = this.service.delete('zona/eliminarnivel', tipo).then(
        data => {
          alert('Nivel eliminado.')
          this.setCliente()
        },
        error => {
          this.errorMessage = <any>error
          console.log(this.errorMessage)
        }
      );
    }
  }

  eliminar(): void {
    this.confirmationService.confirm({
      message: '¿Desea eliminar esta zona?',
      accept: () => {
        this.busy = this.service.delete('zona/eliminar', { 'idNivelZona': this.selectedFile.data }).then(
          data => {
             this.msgs.push({ severity: 'info', summary: 'Éxito', detail: 'Zona eliminada.' });
            this.setCliente()
          },
          error => {
            this.errorMessage = <any>error
            console.log(this.errorMessage)
          }
        );
      }
    });
  }

  onOpenModal() {

  }

  nodeSelected(event) {
    if (event.node.children.length==0)
      this.showDireccion = true;
    else
      this.showDireccion = false;
  }

}
