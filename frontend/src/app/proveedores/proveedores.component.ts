import { Component, OnInit, ElementRef, NgZone, ViewChild, NgModule } from '@angular/core';
import { SelectItem } from 'primeng/primeng';

import { BackendService } from '../services/backend.service';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';

//Gestión de Formas
import { FormControl } from "@angular/forms";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { ModalModule } from "ng2-modal";
import { Message } from 'primeng/primeng';

import { Router, ActivatedRoute, Params } from '@angular/router';
import {DxButtonModule} from 'devextreme-angular';

import { PARAMS } from '../services/params';
import { ElementSchemaRegistry } from '@angular/compiler';
//import notify from 'devextreme/ui/notify';
//import { DxDataGridModule } from 'devextreme-angular';


@NgModule({
  imports: [
      //BrowserModule,
      DxButtonModule
  ]
 // declarations: [AppComponent],
  //bootstrap: [AppComponent]
})

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})

export class ProveedoresComponent implements OnInit {
    URL: string;
    URLDocs: string;
   customers: any[] = [];

  proveedores: any[] = [];
  proveedoresAuxiliar: any[] = [];
  sucursales: any[] = [];
  documentos: any[];
  documentosDDL: any[];
  textoBusqueda: string = ''
  currentProveedor: any;

  okButtonOptions: any

  //Parámetros de alta
  cols: any[];
  errorMessage: string;

  busy: Promise<any>;
  msgs: Message[] = [];

  uploadedDoc: any[] = [];

  type:string = "success"

  fb: FormBuilder;
  frmExpediente: FormGroup;
  frmAcceso: FormGroup;

  @ViewChild('btnClose')
  closeModal: ElementRef

  @ViewChild('btnCloseCuenta')
  closeModalCuenta: ElementRef

  @ViewChild('btnOpen')
  openModal: ElementRef

  @ViewChild('btnOpenCuenta')
  openCuenta: ElementRef

  constructor(
    private service: BackendService,
    private confirmationService: ConfirmationService,
    private ngZone: NgZone,
    private router: Router
  ) {

    this.URL = PARAMS.url;
    this.URLDocs = PARAMS.urlDocs;

    this.cols = [
      { field: 'idProveedor', header: 'ID', width: '50px' },
      { field: 'nombreComercial', header: 'Nombre Comercial', width: '250px' },
      { field: 'razonSocial', header: 'Razón Social', width: '250px' },
      { field: 'RFC', header: 'RFC', width: '150px' },
      { field: 'fechaInicio', header: 'Fecha Inicio', width: '120px' },
      { field: 'categoria', header: 'Categoría', width: '80px' },
      { field: 'direccion', header: 'Dirección', width: '400px' }
    ];

    this.fb = new FormBuilder();

    this.frmExpediente = this.fb.group({
      'idDocumento': [null, Validators.required],
      'folio': [null, Validators.required],
      'vigencia': [null, Validators.required]
    });

    this.frmAcceso = this.fb.group({
      'nombre': [null, Validators.required],
      'mail': [null, Validators.required],
      'usuario': [null, Validators.required],
      'password': [null, Validators.required]
    });


  }

  ngOnInit() {
    this.reload()
    this.busy = this.service.get('proveedor/obtenerdocumentosencabezadoddl', { 'idUsuario': 0 }).then(
      data => {
        this.documentosDDL = data
      },
      error => {
        this.errorMessage = <any>error
        console.log(this.errorMessage)
      }
    );

    this.customers = [{
      "ID": 1,
      "CompanyName": "Super Mart of the West",
      "Address": "702 SW 8th Street",
      "City": "Bentonville",
      "State": "Arkansas",
      "Zipcode": 72716,
      "Phone": "(800) 555-2797",
      "Fax": "(800) 555-2171",
      "Website": "http://www.nowebsitesupermart.com"
    }]

    
  }

  reload() {
    //Cargo la información de inicio
    this.busy = this.service.get('proveedor/obtenerencabezado', { }).then(
      data => {
        let proveedores = data
        let auxiliar = []

        this.busy = this.service.get('proveedor/obtenertodos', {'idUsuario': 1}).then(
          data => {
            let sucursales = data
            
            this.busy = this.service.get('proveedor/obtenertodosdocumentosencabezado', null).then(
              data =>{
                let documentos = data

                proveedores.forEach(function(element){
                  auxiliar.push( {
                    'idProveedorEncabezado' : element.idProveedorEncabezado,
                    'RFC': element.RFC,
                    'nombreComercial': element.nombreComercial,
                    'razonSocial' : element.razonSocial,
                    'fechaInicio' : element.fechaInicio,
                    'categoria' : element.categoria,
                    'calle' : element.calle,
                    'usuario': element.usuario,
                    'password': element.password,
                    'contacto': element.contacto,
                    'mail': element.mail,
                    'logo': element.logo,
                    'children': [],
                    'documentos': []
                  })
    
                  if(element.logo != null && element.logo != undefined && element.logo != ''){
                    auxiliar[auxiliar.length -1].documentos.push({
                      'archivo': element.logo,
                      'descripcion': 'logo'
                    });
                  }
                  for(let tipo of documentos.filter(X => X.idProveedorEncabezado == element.idProveedorEncabezado)){
                    auxiliar[auxiliar.length - 1].documentos.push(tipo)
                  }
                  //let found = data.filter(X => X.idProveedorEncabezado == element.idProveedorEncabezado)
                  for(let tipo of sucursales.filter(X => X.idProveedorEncabezado == element.idProveedorEncabezado)){
                    auxiliar[auxiliar.length - 1].children.push(tipo)
                  }
                  //console.log(found)
                  //auxiliar[0].children.push(found)
                  //console.log(element.idProveedorEncabezado)
                  
                });

                this.proveedores = auxiliar
                this.proveedoresAuxiliar = auxiliar
              },error => {
                this.errorMessage = <any>error
                console.log(this.errorMessage)
              }
            )
            
          error => {
            this.errorMessage = <any>error
            console.log(this.errorMessage)
            }
          }
        );
        
      },
      error => {
        this.errorMessage = <any>error
        console.log(this.errorMessage)
      }
    );
    
  }

  //Edita un proveedor
  editar(object: any): void {
    this.router.navigate(['/nuevoproveedor', object.idProveedorEncabezado])
  }

  editarSucursal(object: any): void{
    this.router.navigate(['/nuevasucursal', object.idProveedorEncabezado, object.idProveedor])
  }

  eliminarSucursal(object: any): void{
    this.confirmationService.confirm({
      message: '¿Desea eliminar esta sucursal?',
      accept: () => {
        //Actual logic to perform a confirmation
        //Cargo la información de inicio
        this.busy = this.service.delete('proveedor/eliminar', object).then(
          data => {
            //notify('Se ha eliminado la sucursal', 'success', 1000);
            this.msgs.push({ severity: 'success', summary: 'Eliminado', detail: 'Se ha eliminado la sucursal.' });
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

  onValueChanged(){
    if(this.textoBusqueda == ''){
      this.proveedores = this.proveedoresAuxiliar
    }else{
      let auxiliar = []
      let textoBusqueda = this.textoBusqueda
      for(let tipo of this.proveedoresAuxiliar.filter(X => X.RFC.toUpperCase().includes(textoBusqueda.toUpperCase()))){
        auxiliar.push(tipo)
      }

      for(let tipo of this.proveedoresAuxiliar.filter(X => X.razonSocial.toUpperCase().includes(textoBusqueda.toUpperCase()))){
        if( auxiliar.find(Y => Y.idProveedorEncabezado == tipo.idProveedorEncabezado) == undefined ){
          auxiliar.push(tipo)
        }
      }

      
      this.proveedoresAuxiliar.forEach(function(element){
        //nombreComercial
        for(let tipo of element.children.filter(X => X.nombreComercial.toUpperCase().includes(textoBusqueda.toUpperCase()))){
          if(auxiliar.find(Y => Y.idProveedorEncabezado == element.idProveedorEncabezado) == undefined ){
            auxiliar.push(element)
          }
        }

        //direccion
        for(let tipo of element.children.filter(X => X.direccion.toUpperCase().includes(textoBusqueda.toUpperCase()))){
          if(auxiliar.find(Y => Y.idProveedorEncabezado == element.idProveedorEncabezado) == undefined ){
            auxiliar.push(element)
          }
        }

        //contacto
        for(let tipo of element.children.filter(X => X.contacto.toUpperCase().includes(textoBusqueda.toUpperCase()))){
          if( auxiliar.find(Y => Y.idProveedorEncabezado == element.idProveedorEncabezado) == undefined ){
            auxiliar.push(element)
          }
        }

        //mail
        for(let tipo of element.children.filter(X => X.mail.toUpperCase().includes(textoBusqueda.toUpperCase()))){
          if( auxiliar.find(Y => Y.idProveedorEncabezado == element.idProveedorEncabezado) == undefined ){
            auxiliar.push(element)
          }
        }
      });

      this.proveedores = auxiliar;
    }
  }


  //Funcion para eliminar
  eliminar(tipo: any): void {
    this.confirmationService.confirm({
      message: '¿Desea eliminar este proveedor?',
      accept: () => {
        //Actual logic to perform a confirmation
        //Cargo la información de inicio
        this.busy = this.service.delete('proveedor/eliminarencabezado', tipo).then(
          data => {
            //notify('Se ha eliminado el proveedor', 'success', 1000);
            this.msgs.push({ severity: 'success', summary: 'Eliminado', detail: 'Se ha eliminado el proveedor.' });
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

  nuevaSucursal(object: any): void{
    this.router.navigate(['/nuevasucursal', object.idProveedorEncabezado])
  }

  reloadDocs() {
    this.busy = this.service.get('proveedor/obtenerdocumentosencabezado', this.currentProveedor).then(
      data => {
        this.documentos = data
      },
      error => {
        this.errorMessage = <any>error
        console.log(this.errorMessage)
      }
    );
  }

  expediente(data: any) {
    this.currentProveedor = data
    this.reloadDocs();
    this.openModal.nativeElement.click();
  }

  saveDocument(value: string): void {
    let parametros = JSON.parse(JSON.stringify(value));
    parametros.idUsuario = 0
    parametros.archivo = this.uploadedDoc[0].uploadName
    parametros.idProveedor = this.currentProveedor.idProveedorEncabezado
    this.busy = this.service.post('proveedor/agregardocumentoencabezado', parametros).then(
      data => {
        //notify('Documento cargado al expediente', 'success', 1000);
        this.msgs.push({ severity: 'success', summary: 'Éxito', detail: 'Documento cargado al expediente.' });
        this.reloadDocs();
        this.frmExpediente.reset();
        this.uploadedDoc = [];
      },
      error => {
        this.errorMessage = <any>error
        console.log(this.errorMessage)
      }
    );
  }

  onOpenExpediente() {

  }

  onOpenCuenta(data: any): void {
    this.currentProveedor = data
    this.frmAcceso = this.fb.group({
      'nombre': [this.currentProveedor.contacto, Validators.required],
      'mail': [this.currentProveedor.mail, Validators.required],
      'usuario': [this.currentProveedor.usuario, Validators.required],
      'password': [this.currentProveedor.password, Validators.required]
    });
  }

  sendCuenta(value: string): void {
    let parametros = JSON.parse(JSON.stringify(value));
    parametros.idProveedor = this.currentProveedor.idProveedorEncabezado
    this.busy = this.service.put('proveedor/acceso', parametros).then(
      data => {
        //notify('Datos de acceso enviados al correo electrónico del cliente', 'success', 1000);
        this.msgs.push({ severity: 'success', summary: 'Éxito', detail: 'Datos de acceso enviados al correo electrónico del cliente.' });
        this.closeModalCuenta.nativeElement.click();
        this.reload()
      },
      error => {
        this.errorMessage = <any>error
        console.log(this.errorMessage)
      }
    );
    this.closeModalCuenta.nativeElement.click();

  }

  onUpload(event) {
    for (let file of event.files) {
      file.uploadName = event.xhr.response
      //Para cargar un solo documento a la vez
      this.uploadedDoc = [];
      this.uploadedDoc.push(file);
    }
    //notify('Documento cargado correctamente', 'success', 1000);
    this.msgs.push({ severity: 'info', summary: 'Éxito', detail: 'Documento cargado correctamente' });
  }

  deleteUploaded(key): void {
    var index = this.uploadedDoc.indexOf(key, 0);
    if (index > -1) {
      this.uploadedDoc.splice(index, 1);
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
