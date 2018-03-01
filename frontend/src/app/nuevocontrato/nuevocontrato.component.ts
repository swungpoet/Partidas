import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { SelectItem } from 'primeng/primeng';


import { BackendService } from '../services/backend.service';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';

//Gestión de Formas
import { FormControl } from "@angular/forms";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';

import { ModalModule } from "ng2-modal";
import { Message } from 'primeng/primeng';
import { MenuItem } from 'primeng/primeng';

@Component({
  selector: 'app-nuevocontrato',
  templateUrl: './nuevocontrato.component.html',
  styleUrls: ['./nuevocontrato.component.css']
})
export class NuevoContratoComponent implements OnInit {

  inicio: Date
  fin: Date
  checked : boolean
  licitacionesDDL: any[]
  unidades: any[]
  proveedores: any[]
  errorMessage: string
  isDisabled: boolean
  empresasDDL: any[]
  idUsuario
  busy: Promise<any>;
  msgs: Message[] = [];

  selectedProveedores: any[]
  selectedUnidades: any[]

  fb: FormBuilder
  frmContrato: FormGroup;

  //VARIABLE PARA LA EDICION
  contrato: any;

  constructor(
    private service: BackendService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private route: ActivatedRoute,
    public auth: AuthenticationService
  ) {

    this.inicio = new Date()
    this.checked = true
    this.selectedUnidades = [];
    this.selectedProveedores = [];
    this.isDisabled = false

    this.fb = new FormBuilder()
    this.frmContrato = this.fb.group({
      'idContrato': [null],
      'idLicitacion': [null, Validators.required],
      'numero': [null, Validators.required],
      'descripcion': [null, Validators.required],
      'fechaInicio': [null, Validators.required],
      'fechaFin': [null, Validators.required],
      'estatus': [null]
    });

  }

  ngOnInit() {
    let id = +this.route.snapshot.params['id'];

    this.idUsuario = JSON.parse(this.auth.getUser()).idUsuario
    //Obtengo el combo de licitaciones
    this.busy = this.service.get('licitacion/obtenertodasddl', { 'idUsuario': 0 }).then(
      data => this.licitacionesDDL = data,
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


    //Obtengo el combo de unidades
    this.busy = this.service.get('unidad/obtenerunidadddl', {'idUsuario': 0, 'idContrato': id}).then(
      data => this.unidades = data,
      error => {
        this.errorMessage = <any>error
        console.log(this.errorMessage)
      }
    );

    //Obtengo el combo de proveedores
    this.busy = this.service.get('proveedor/obtenertodosddl', { 'idUsuario': 0 }).then(
      data => {this.proveedores = data},
      error => {
        this.errorMessage = <any>error
        console.log(this.errorMessage)
      }
    );

    //VALIDAMOS SI VAMOS A EDITAR
    if (!isNaN(id)) {
      //OBTENEMOS LOS DATOS DEL CONTRATO POR ID
      this.busy = this.service.get('contrato/obtenerbyid', { 'idContrato': id }).then(
        data => {
          this.isDisabled = true
          this.contrato = data[0] //ASIGNAMOS RESULT TO JSON
          this.busy = this.service.get('contrato/obtenerunidadesbyid', { 'idContrato': id }).then(
            data => {
              this.selectedUnidades = []
              for(let tipo of data){
                this.selectedUnidades.push(tipo.idUnidad)
              }
              this.busy = this.service.get('contrato/obtenerproveedoresbyid', { 'idContrato': id }).then(
                data => {
                  this.selectedProveedores = []
                  for(let tipo of data){
                    this.selectedProveedores.push(tipo.idProveedor)
                  }
                  //ELIMINAMOS DEL CATALOGO PRINCIPAL LAS UNIDADES YA EXISTENTES
                  // for (var i = 0; i <= this.selectedUnidades.length - 1; i++) {
                  //   var position = this.unidades.indexOf(this.unidades.find(item => item.idUnidad == this.selectedUnidades[i].idUnidad))
                  //   if (position != -1)
                  //     this.unidades.splice(position, 1);
                  // }
                  //ELIMINAMOS DEL CATALOGO PRINCIPAL LAS UNIDADES YA EXISTENTES
                  // for (var i = 0; i <= this.selectedProveedores.length - 1; i++) {
                  //   var position = this.proveedores.indexOf(this.proveedores.find(item => item.idProveedor == this.selectedProveedores[i].idProveedor))
                  //   if (position != -1)
                  //     this.proveedores.splice(position, 1);
                  // }
                  this.checked = this.contrato.estatus
                  console.log(this.contrato.estatus)
                  console.log(this.checked)
                  this.frmContrato = this.fb.group({
                    'idContrato': [this.contrato.idContrato],
                    'idLicitacion': [this.contrato.idLicitacion, Validators.required],
                    'numero': [this.contrato.numeroContrato, Validators.required],
                    'descripcion': [this.contrato.descripcionContrato, Validators.required],
                    'fechaInicio': [new Date(this.contrato.fechaInicio), Validators.required],
                    'fechaFin': [new Date(this.contrato.fechaFin), Validators.required]
                  })

                },
                error => {
                  console.log(<any>error)
                  this.msgs.push({ severity: 'error', summary: 'Error', detail: 'Error al obtener las unidades del contrato.' });
                })
            },
            error => {
              console.log(<any>error)
              this.msgs.push({ severity: 'error', summary: 'Error', detail: 'Error al obtener las unidades del contrato.' });
            }
          )
        },
        error => {
          console.log(<any>error)
          this.msgs.push({ severity: 'error', summary: 'Error', detail: 'Error al obtener los datos del contrato.' });
        })
    }

  }

  save(value: string): void {
    let parametros = JSON.parse(JSON.stringify(value));
    parametros.idUsuario = 0
    parametros.estatus = this.checked==true?1:0
    //parametros.jsonUnidades = JSON.stringify(this.selectedUnidades)

    let unidadesAux = []
    for(let tipo of this.selectedUnidades){
      unidadesAux.push({'idUnidad': tipo})
    }
    parametros.jsonUnidades = JSON.stringify(unidadesAux)

    let proveedoresAux = []
    for(let tipo of this.selectedProveedores){
      proveedoresAux.push({'idProveedor': tipo})  
    }
    parametros.jsonProveedores = JSON.stringify(proveedoresAux)


    if (parametros.idContrato == null) {
      this.busy = this.service.post('contrato/agregar', parametros).then(
        data => {
          this.msgs.push({ severity: 'success', summary: 'Éxito', detail: 'Contrato agregado correctamente.' });
          this.frmContrato.reset();
          this.router.navigate(['/contratos'])
        },
        error => {
          this.errorMessage = <any>error
          console.log(this.errorMessage)
        }
      );
    }
    else {
      this.busy = this.service.post('contrato/actualizar', parametros).then(
        data => {
          this.msgs.push({ severity: 'success', summary: 'Éxito', detail: 'Contrato actualizado correctamente.' });
          this.frmContrato.reset();
          this.router.navigate(['/contratos'])
        },
        error => {
          this.errorMessage = <any>error
          console.log(this.errorMessage)
        }
      );
    }
  }

}
