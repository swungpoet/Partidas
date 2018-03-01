import { Component, OnInit, ElementRef, NgZone, ViewChild } from '@angular/core';
import { SelectItem } from 'primeng/primeng';

import { BackendService } from '../services/backend.service';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';

//Gestión de Formas
import { FormControl } from "@angular/forms";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { ModalModule } from "ng2-modal";
import { Message } from 'primeng/primeng';

import { TreeNode } from 'primeng/primeng';

import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-proveedorzona',
  templateUrl: './proveedorzona.component.html',
  styleUrls: ['./proveedorzona.component.css']
})


export class ProveedorZonaComponent implements OnInit {


  //Objeto principal
  proveedoresDDL: any;
  zonas: any;
  selectedProveedor: any;

  selectedDB: any;

  errorMessage: string;

  busy: Promise<any>;
  msgs: Message[] = [];

  fb: FormBuilder
  frmZona: FormGroup;

  //////////////////////
  selectedFile: TreeNode
  selectedFiles: TreeNode[] = []
  files: TreeNode[]

  filesLoaded: TreeNode[]

  constructor(
    private service: BackendService,
    private confirmationService: ConfirmationService,
    private ngZone: NgZone,
    private router: Router,
    private route: ActivatedRoute) {
      this.selectedFiles = [],
      this.files = []
    this.fb = new FormBuilder()
    this.frmZona = this.fb.group({
      'idContratoProveedor': [null]
    });
    

  }

  ngOnInit() {
    let id = +this.route.snapshot.params['id'];
    //Obtengo la cotizacion
    //Obtengo la lista de proveedores
    this.busy = this.service.get('contrato/obtenerproveedores', {
      'idUsuario': 0,
      'idContrato': id
    }).then(
      data => {
        this.proveedoresDDL = data;
      },
      error => {
        this.errorMessage = <any>error
        console.log(this.errorMessage)
      }
      );
  }

  setProveedor(): void {
    this.selectedFiles = []
    this.files = []
    let id = +this.route.snapshot.params['id'];
    this.busy = this.service.get('zona/obtenerbycontrato', {
      'idUsuario': 0,
      'idContrato': id,
      'idContratoProveedor': this.frmZona.controls['idContratoProveedor'].value
    }).then(
      data => {
        this.zonas = data
        this.setTree()
      },
      error => {
        this.errorMessage = <any>error
        console.log(this.errorMessage)
      }
      );
  }

  setTree() {
    this.files = [{
      "label": "Root",
      "data": 0,
      "expandedIcon": "fa-folder-open",
      "collapsedIcon": "fa-folder",
      "expanded": true,
      "selectable": false,
      "partialSelected": true,
      "children": []
    }]
    //Nivel 1
    for (let level1 of this.zonas.filter(data => { return data.nivel == 1 })) {
      let node1: TreeNode = <TreeNode>{
        "label": level1.nombre,
        "data": level1.idZona,
        "expandedIcon": "fa-folder-open",
        "collapsedIcon": "fa-folder",
        "children": []
      }
      this.files[0].children.push(node1);
      if (level1.selected == 1)
        this.selectedFiles.push(node1);

      //Nivel 2
      for (let level2 of this.zonas.filter(data => { return data.nivel == 2 })) {
        if (level1.idZona == level2.idPadre) {
          let node2: TreeNode = <TreeNode>{
            "label": level2.nombre,
            "data": level2.idZona,
            "expandedIcon": "fa-folder-open",
            "collapsedIcon": "fa-folder",
            "children": []
          }
          this.files[0].children.filter(data => { return data.data == level1.idZona })[0].children.push(node2);
          if (level2.selected == 1)
            this.selectedFiles.push(node2);

          //Nivel 3
          for (let level3 of this.zonas.filter(data => { return data.nivel == 3 })) {
            if (level2.idZona == level3.idPadre) {
              let node3: TreeNode = <TreeNode>{
                "label": level3.nombre,
                "data": level3.idZona,
                "expandedIcon": "fa-folder-open",
                "collapsedIcon": "fa-folder",
                "children": []
              }
              this.files[0].children.filter(data => { return data.data == level1.idZona })[0].children.filter(data => { return data.data == level2.idZona })[0].children.push(node3);
              if (level3.selected == 1)
                this.selectedFiles.push(node3);

              //Nivel 4
              for (let level4 of this.zonas.filter(data => { return data.nivel == 4 })) {
                if (level3.idZona == level4.idPadre) {
                  let node4: TreeNode = {
                    "label": level4.nombre,
                    "data": level4.idZona,
                    "expandedIcon": "fa-folder-open",
                    "collapsedIcon": "fa-folder",
                    "selectable": false,
                    "children": []
                  }
                  this.files[0].children.filter(data => { return data.data == level1.idZona })[0].children.filter(data => { return data.data == level2.idZona })[0].children.filter(data => { return data.data == level3.idZona })[0].children.push(node4);
                  if (level4.selected == 1)
                    this.selectedFiles.push(node4);
                }
              }
            }
          }
        }
      }
    }
  }

  save(value: string): void {
    let id = +this.route.snapshot.params['id'];
    let Zonas: any[] = [];

    for (var i = 0; i <= this.selectedFiles.length - 1; i++) {
      if (Zonas.find(item=>item.IdZona==this.selectedFiles[i].data)==undefined)
          Zonas.push({ 'IdZona': this.selectedFiles[i].data });
    }

    this.busy = this.service.post('contrato/agregarproveedorzona', {
      'idUsuario': 0,
      'idContratoProveedor': this.frmZona.controls['idContratoProveedor'].value,
      'json': JSON.stringify(Zonas)
    }).then(
      data => {
        this.selectedFiles = []
        this.files = []
        this.setProveedor();
        this.msgs.push({ severity: 'success', summary: 'Éxito', detail: 'Cobertura Guardada.' });
      },
      error => {
        this.errorMessage = <any>error
        console.log(this.errorMessage)
      }
      );

  }

  regresar(): void {
    this.router.navigate(['/contratos'])
  }

}
