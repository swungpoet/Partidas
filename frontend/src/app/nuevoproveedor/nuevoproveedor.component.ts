import { Http, Response, RequestOptions, Request, RequestMethod, Headers } from '@angular/http';

import { Component, OnInit, ElementRef, NgZone, ViewChild } from '@angular/core';
import { SelectItem } from 'primeng/primeng';


import { BackendService } from '../services/backend.service';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';

import { MapsAPILoader } from '@agm/core';

//Gestión de Formas
import { FormControl } from "@angular/forms";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//Google APPs Module
// import { AgmCoreModule } from "angular2-google-maps/core";
import { AgmCoreModule } from '@agm/core';
import { AgmMap, AgmMarker } from '@agm/core';

import { ModalModule } from "ng2-modal";
import { Message } from 'primeng/primeng';

import notify from 'devextreme/ui/notify';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { PARAMS } from '../services/params';

import {DxSelectBoxModule,
  DxCheckBoxModule,
  DxTextBoxModule,
  DxDateBoxModule,
  DxButtonModule,
  DxValidatorModule,
  DxScrollViewModule,
  DxScrollViewComponent,
  DxDropDownBoxModule,
  DxTileViewModule,
  DxFormModule,
  DxContextMenuModule,
  DxPopupModule,
  DxListModule,
  DxFileUploaderModule,
  DxValidationSummaryModule} from 'devextreme-angular';


@Component({
  selector: 'app-nuevoproveedor',
  templateUrl: './nuevoproveedor.component.html',
  styleUrls: ['./nuevoproveedor.component.css']
})

export class NuevoProveedorComponent implements OnInit {

  URL: string;
  URLDocs: string;
  @ViewChild('btnOpen')
  openModal: ElementRef
  menuItems
  selectedTileViewItem
  //Parámetros de alta
  expediente;
  errorMessage: string;
  popupVisible: boolean = false;
  busy: Promise<any>;
  msgs: Message[] = [];
  documentName: string = '';
  btnExpediente: boolean;
  logo: string = '';
  files;
  uploaded: any[] = [];
  uploadedDocument: any[] = []
  documento: any[] = [];
  proveedor;
  //datosFiscales;

  //Gestión de destino
  /*latitude: number;
  longitude: number;
  zoom: number;
  showModal: Boolean*/

  gb: string

  //searchControl: FormControl;
  /*
  @ViewChild("search")
  public searchElementRef: ElementRef;*/

  
  IDs: any[] = [];
  //Variables de control para selección manual
  categoriasDDL: string[] = [];
  categoriasSelect;

  documentos: any[] = []
  documentosDDL: string[] = [];
  documentosSelect;
  selectedDocumento;
  //clasificacionDDL: any[]
  //subclasificacionDDL: any[]
  tipos: any[]
  //combustiblesDDL: any[]
  //especialidadesDDL: any[]
  //especialidades: any[]
  selectedTipos: any[]
  selectedCategoria;
  

  fb: FormBuilder;
  frmContrato: FormGroup;
  
  //selectedEspecialidades: any[]
  //selectedCombustibles: any[] = []
  //selectedDIESEL: any[] = []
  //selectedGASOLINA: any[] = []
  razonSocial: string;
  tipoPersonaDDL
  tipoPersonaSelect
  fechaInicio: Date
  //proveedorEspecialidades: any[]
  //proveedorTiposCombustible: any[]
  proveedorDatosFiscales: any[]

  _headers: Headers
  requestoptions: any

  addressList: any[] = []



  constructor(
    private service: BackendService,
    private confirmationService: ConfirmationService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private router: Router,
    private route: ActivatedRoute,
    private http: Http
  ) {
    this.URL = PARAMS.url;
    //this.URL = 'http://189.204.141.193:5500/api/';
    this.URLDocs = PARAMS.urlDocs;
    this.logo = ""
    this.files = []
    this.selectedCategoria = ""
    this.categoriasSelect = []
    this.btnExpediente = false
    this.documentos = []

    this.fb = new FormBuilder();
    
        this.expediente = {
          'selectedDocumento': [null],
          'folio': [null]
        };


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

    this.menuItems = [
      { text: 'Eliminar'}
    ];
    //this.fb = new FormBuilder()
    this.proveedor = {
      //'idProveedor': [null],
      'nombreComercial': [null],
      'razonSocial': [null],
      'RFC': [null],
      //'fechaInicio': [null, Validators.required],
      //'fechaInicioFormato': [null],
      'idCategoria': [null],
      'selectedCategoria': [null],
      //'idProveedorClasificacion': [null, Validators.required],
      //'direccion': [null],
     // 'latitud': [null],
      //'longitud': [null],
     // 'poligono': [null],
      //'idBPRO': [{ value: null, disabled: true }],
      'tipoPersona': [null],
      'tipoPersonaValue': [null],
      'pais': 'México',
      'estado': [null],
      'ciudad': [null],
      'delegacion': [null],
      'colonia': [null],
      'calle': [null],
      'numExt': [null],
      'numInt': [null],
      'cp': [null],
      'lada': [null],
      'logo': ''
    };

    this.tipoPersonaDDL = [];
    // this.tiposPersona.push({ label: 'PERSONA MORAL', value: 'MOR' });
    // this.tiposPersona.push({ label: 'PERSONA FÍSICA', value: 'FIS' });
    // this.tiposPersona.push({ label: 'PERSONA FÍSICA C/ACT/EMP', value: 'FIE' });

    this.tipoPersonaDDL.push('PERSONA MORAL');
    this.tipoPersonaDDL.push('PERSONA FÍSICA');
    this.tipoPersonaDDL.push('PERSONA FÍSICA C/ACT/EMP');

    this.tipoPersonaSelect = [
      { label: 'PERSONA MORAL', value: 'MOR' },
      { label: 'PERSONA FÍSICA', value: 'FIS' },
      { label: 'PERSONA FÍSICA C/ACT/EMP', value: 'FIE' }
    ]
    this.selectedTipos = [];
  }
 

  ngOnInit() {
    this.busy = this.service.get('proveedor/obtenercategoria', { 'idUsuario': 0 }).then(
      data => {
        this.categoriasSelect = data
        this.categoriasDDL = []
        for(let tipo of data){
          this.categoriasDDL.push(tipo.label)
        }
      },
      error => {
        this.errorMessage = <any>error
        console.log(this.errorMessage)
      }
    );

    
    this.reload()
    let id = +this.route.snapshot.params['id'];
    if (!isNaN(id)) {
      this.btnExpediente = true
      this.busy = this.service.get('proveedor/obtenerencabezadobyid', {
        'idProveedorEncabezado': id
      }).then(
        data => {
          
          //console.log(data)
          
          //Asigno Información
          this.proveedor ={
            'idProveedor': data[0].idProveedorEncabezado,
            'nombreComercial': data[0].nombreComercial,
            'razonSocial': data[0].razonSocial,
            'RFC': data[0].RFC,
            'fechaInicio': data[0].fechaInicio,
            //'fechaInicioFormato': [null],
            'idCategoria': data[0].idCategoria,
            'selectedCategoria': data[0].categoria,
            //'idProveedorClasificacion': [this.proveedor.idProveedorClasificacion, Validators.required],
            //'direccion': [this.proveedor.direccion],
            //'latitud': [this.proveedor.latitud],
            //'longitud': [this.proveedor.longitud],
            //'poligono': [this.proveedor.poligono],
            //'idBPRO': [this.proveedor.idBPRO],
            'pais': 'México',
            'tipoPersona': data[0].tipoPersona,
            //'tipoPersonaValue': this.tipoPersonaSelect.find(X => X.value == data[0].tipoPersona).label == '' ? null : this.tipoPersonaSelect.find(X => X.value == data[0].tipoPersona).label,
            'estado': data[0].estado,
            'ciudad': data[0].ciudad,
            'delegacion': data[0].delegacion,
            'colonia': data[0].colonia,
            'calle': data[0].calle,
            'numExt': data[0].numExt,
            'numInt': data[0].numInt,
            'cp': data[0].cp,
            'lada': data[0].lada,
            'logo': data[0].logo
          };
          if(data[0].tipoPersona != null && data[0].tipoPersona != ''){
            this.proveedor.tipoPersonaValue = this.tipoPersonaSelect.find(X => X.value == data[0].tipoPersona).label
          }

          this.reloadDocs();

          this.busy = this.service.get('proveedor/obtenerempresabyid',
          {'idProveedorEncabezado': id}
          ).then(
            data =>{

              this.IDs = data

            }, error =>{
              console.log(<any>error)
              notify('error al obtener el proveedor', 'error', 1000);
              this.msgs.push({ severity: 'error', summary: 'Error', detail: 'Error al obtener el proveedor.' });
            }
          )
        },
        error => {
          console.log(<any>error)
          notify('error al obtener el proveedor', 'error', 1000);
          this.msgs.push({ severity: 'error', summary: 'Error', detail: 'Error al obtener el proveedor.' });
        }
        );
    }else{
      this.btnExpediente = false;
    }
  }

  close(){
    this.popupVisible = false;
  }
  reload() {
    
  }

  cancelar(){
    this.router.navigate(['/proveedores']);
  }

  eliminarDocumento(data){
    this.busy = this.service.delete('proveedor/eliminardocumento', {'idProveedorDocumento' : data.idProveedorDocumento}).then(
      data => {
        this.reloadDocs()
      }, error => {
        console.log(<any>error)
        //notify('error al obtener el proveedor', 'error', 1000);
        this.msgs.push({ severity: 'error', summary: 'Error', detail: 'Error al eliminar el documento.' });
      }
    )
  }

  editarDocumento(data){
    this.expediente = data

    let persona = this.documentosSelect.find(X => X.value == data.idDocumento)
    if(persona)
      this.expediente.selectedDocumento = persona.label
  }


  reloadDocs() {
    
      this.busy = this.service.get('proveedor/obtenerdocumentosencabezadoddl', {'idUsuario': 0}).then(
        data => {
          this.documentosSelect = data
          this.documentosDDL = []
          for(let tipo of data){
            this.documentosDDL.push(tipo.label);
          }
          //this.documentos = data
        },
        error => {
          this.errorMessage = <any>error
          console.log(this.errorMessage)
        }
      );
      this.busy = this.service.get('proveedor/obtenerdocumentosencabezado', { 'idProveedorEncabezado': this.proveedor.idProveedor}).then(
        data => {
          this.documentos = data
        },
        error => {
          this.errorMessage = <any>error
          console.log(this.errorMessage)
        }
      );
  }

  onOpenExpediente() {
    /*this.currentProveedor = data*/
    this.reloadDocs();
    this.popupVisible = true
    //this.openModal.nativeElement.click();
  }

  saveDocument(value: string): void {
    let parametros = JSON.parse(JSON.stringify(this.expediente));
    parametros.idUsuario = 0
    parametros.archivo = this.documentName
    parametros.idProveedor = this.proveedor.idProveedor
    
    let persona = this.documentosSelect.find(X => X.label == this.expediente.selectedDocumento)
    if(persona)
      parametros.idDocumento = persona.value

    this.busy = this.service.post('proveedor/agregardocumentoencabezado', parametros).then(
      data => {
        notify('Documento cargado al expediente', 'success', 1000);
        this.msgs.push({ severity: 'success', summary: 'Éxito', detail: 'Documento cargado al expediente.' });
        this.reloadDocs();
        this.uploadedDocument = [];
        this.documento = []
        this.expediente = {
          'selectedDocumento': '',
          'folio': '',
          'vigencia': ''
        }
      },
      error => {
        this.errorMessage = <any>error
        console.log(this.errorMessage)
      }
    );
  }

  
  onUpload(event) {
    for (let file of event.file) {
      file.uploadName = event.xhr.response
      //Para cargar un solo documento a la vez
      this.uploaded = [];
      this.uploaded.push(file);
      this.proveedor.logo = event.request.response
    }
    this.proveedor.logo = event.request.response
    notify('Archivo cargado correctamente', 'success', 1000);
    this.msgs.push({ severity: 'info', summary: 'Éxito', detail: 'Archivo cargado correctamente' });
  }

  onUploadDocument(event) {
    for (let file of event.file) {
      file.uploadName = event.xhr.response
      //Para cargar un solo documento a la vez
      this.uploadedDocument = [];
      this.uploadedDocument.push(file);
      this.documentName = event.request.response
    }
    this.documentName = event.request.response
    notify('Archivo cargado correctamente', 'success', 1000);
    this.msgs.push({ severity: 'info', summary: 'Éxito', detail: 'Archivo cargado correctamente' });
  }


  deleteUploaded(key): void {
    var index = this.uploaded.indexOf(key, 0);
    if (index > -1) {
      this.uploaded.splice(index, 1);
    }
  }

  save() {
    //console.log(this.proveedor)
    
    let persona = this.tipoPersonaSelect.find(X => X.label == this.proveedor.tipoPersonaValue)
    if(persona)
      this.proveedor.tipoPersona = persona.value
    
    let cat = this.categoriasSelect.find(X => X.label == this.proveedor.selectedCategoria)
    if(cat)
      this.proveedor.idCategoria = cat.value

    if(isNaN(this.proveedor.idProveedor)){
      this.busy = this.service.post('proveedor/agregarencabezado', this.proveedor).then(
        data => {
          notify('Proveedor agregado correctamente', 'success', 1000);
          this.msgs.push({ severity: 'success', summary: 'Éxito', detail: 'Proveedor agregado correctamente.' });
          this.router.navigate(['/proveedores'])
        },
        error => {
          this.errorMessage = <any>error
          console.log(this.errorMessage)
          notify('No se pudo agregar el proveedor', 'error', 1000);
          this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo agregar el proveedor' });
        }
      );
    }else{
      this.busy = this.service.put('proveedor/actualizarencabezado', this.proveedor).then(
        data => {
          notify('Proveedor actualizado', 'success', 1000);
          this.msgs.push({ severity: 'success', summary: 'Éxito', detail: 'Proveedor actualizado.' });
          this.router.navigate(['/proveedores'])
        },
        error => {
          this.errorMessage = <any>error
          console.log(this.errorMessage)
          notify('No se pudo actualizar el proveedor', 'error', 1000);
          this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar el proveedor' });
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
            notify('Se ha eliminado el cliente', 'success', 1000);
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

  onItemClick(e){
    if(e.itemIndex == 0){
      this.confirmationService.confirm({
        message: "¿Desea eliminar este documento (" + (this.selectedTileViewItem == null ? "" : this.selectedTileViewItem.descripcion) + ")?",
        accept: () => {
          this.busy = this.service.delete("proveedor/eliminardocumentoencabezado", {
            'idProveedorEncabezadoDocumento': this.selectedTileViewItem.idProveedorEncabezadoDocumento
          }).then(
            data => {
              this.busy = this.service.get('proveedor/obtenerdocumentosencabezado', { 'idProveedorEncabezado': this.proveedor.idProveedor}).then(
                data => {
                  this.documentos = data
                },
                error => {
                  this.errorMessage = <any>error
                  console.log(this.errorMessage)
                }
              );
            }, error => {
              this.errorMessage = <any>error
              console.log(this.errorMessage)
            }
          )
        }
      });
    }
  }


  onItemContextMenu(e){
    for(var i = 0; i < this.documentos.length; i++){
      if(i == e.itemIndex){
        this.selectedTileViewItem = this.documentos[i]
      }
    }
  }

}

