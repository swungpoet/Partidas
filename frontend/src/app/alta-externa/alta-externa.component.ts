import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { SelectItem } from 'primeng/primeng';

import { BackendService } from '../services/backend.service';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';

import { ModalModule } from "ng2-modal";

import { Message } from 'primeng/primeng';
import { Router, ActivatedRoute, Params } from '@angular/router';

//Gestión de Formas
import { FormControl } from "@angular/forms";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PARAMS } from '../services/params';

@Component({
  selector: 'alta-externa',
  templateUrl: './alta-externa.component.html',
  styleUrls: ['./alta-externa.component.css']
})

export class AltaExternaComponent implements OnInit {

  URL: string;
  URLDocs: string;
  //Listas de elementos
  unidades: any[] = [];
  unidadesDDL: any[] = [];
  marcas: any[];
  marcasDDL: any[];
  submarcas: any[];
  submarcasDDL: any[];
  modelosDDL: any[];
  tiposDDL: any[];
  sucursalesDDL: any[] = [];
  ouDDL: any[] = [];

  fecha: Date

  //Columnas de GRID
  cols: any[];
  colsMarca: any[];
  colsSubMarca: any[];
  colsUnidad: any[];
  errorMessage: string;
  tiposCombustible: any[] = [];
  cilindros: any[] = [];

  busy: Promise<any>;
  msgs: Message[] = [];
  //Carga de Archivos
  uploadedFR: any[] = [];
  uploadedDE: any[] = [];
  uploadedIZ: any[] = [];
  uploadedAT: any[] = [];
  uploadedTA: any[] = [];
  uploadedAU: any[] = [];
  uploadedRE: any[] = [];
  uploadedVI: any[] = [];
  uploadedVA: any[] = [];
  uploadedVFM: any[] = [];
  uploadedREF: any[] = [];
  uploadedTEN: any[] = [];

  frmMarca: FormGroup;
  frmSubMarca: FormGroup;
  frmUnidad: FormGroup;

  @ViewChild('btnClose')
  closeModal: ElementRef

  @ViewChild('btnOpen')
  openModal: ElementRef

  constructor(
    private service: BackendService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {

    this.URL = PARAMS.url;
    this.URLDocs = PARAMS.urlDocs;
    //Columnas modelos
    this.colsUnidad = [
      { field: 'numeroEconomico', header: 'Económico', width: '100px' },
      { field: 'tipoUnidad', header: 'TipoCombustible/SinMotor', width: '350px' },
      { field: 'vin', header: 'VIN', width: '200px' },
      { field: 'placas', header: 'Placas', width: '80px' },
      { field: 'modelo', header: 'Modelo', width: '80px' },
      { field: 'nombreCompleto', header: 'Usuario Registra', width: '250px' },
      { field: 'fecha', header: 'Fecha', width: '100px' }
    ];

    this.fecha = new Date()

    //Formulario de alta de Modelos
    this.frmUnidad = fb.group({
      'idUnidad': [null],
      'idUsuario': [null],
      'idSucursal': [null],
      'idUnidadOperativa': [null],
      'idTipoUnidad': [null],
      'numeroEconomico': [null, Validators.required],
      'vin': [null, Validators.required],
      'placas': [null, Validators.required],
      'modelo': ['', Validators.required],
      'frente': [null],
      'derecho': [null],
      'izquierdo': [null],
      'atras': [null],
      'tarjeta': [null],
      'repuve': [null],
      'placavin': [null],
      'autorizacion': [null],
      'verificacionAmbiental': [null],
      'fechaVencimientoVerificacionAmbiental': [null],
      'verificacionFisicoMecanica': [null],
      'fechaVencimientoVerificacionFisicoMecanica': [null],
      'tenencia': [null],
      'fechaVencimientoTenencia': [null],
      'refrendo': [null],
      'fechaVencimientoRefrendo': [null]
    });

  }

  ngOnInit() {
    //Cargo la información de inicio
    this.reload();
  }

  reload(): void {
    let idOperacion, idUsuario;
    idOperacion = +this.route.snapshot.queryParams['idOperacion'];
    idUsuario = +this.route.snapshot.queryParams['idUsuario'];

    this.busy = this.service.get('unidad/obtenerunidadASE', {
      'idUsuario': idUsuario,
      'idOperacion': idOperacion
    }).then(
      data => {
        this.unidades = data
      },
      error => {
        this.errorMessage = <any>error
        console.log(this.errorMessage)
        this.msgs.push({ severity: 'error', summary: 'Error', detail: this.errorMessage });
      }
      );
  }

  ////////////////GESTION DE MODELOS
  onOpenModelo(): void {
    let idOperacion, idUsuario;
    idOperacion = +this.route.snapshot.queryParams['idOperacion'];
    idUsuario = +this.route.snapshot.queryParams['idUsuario'];

    this.busy = this.service.get('unidad/obtenerunidadbyoperacionddl', { 'idUsuario': idUsuario, 'idOperacion': idOperacion }).then(
      data => {
        this.unidadesDDL = data
      },
      error => {
        this.errorMessage = <any>error
        console.log(this.errorMessage)
        this.msgs.push({ severity: 'error', summary: 'Error', detail: this.errorMessage });
      }
    );

    this.busy = this.service.get('unidad/obtenersucursalASE', { 'idUsuario': 0 }).then(
      data => {
        this.sucursalesDDL = data
      },
      error => {
        this.errorMessage = <any>error
        console.log(this.errorMessage)
        this.msgs.push({ severity: 'error', summary: 'Error', detail: this.errorMessage });
      }
    );

    this.modelosDDL = [
      { value: '1980', label: '1980' },
      { value: '1981', label: '1981' },
      { value: '1982', label: '1982' },
      { value: '1983', label: '1983' },
      { value: '1984', label: '1984' },
      { value: '1985', label: '1985' },
      { value: '1986', label: '1986' },
      { value: '1987', label: '1987' },
      { value: '1988', label: '1988' },
      { value: '1989', label: '1989' },
      { value: '1990', label: '1990' },
      { value: '1991', label: '1991' },
      { value: '1992', label: '1992' },
      { value: '1993', label: '1993' },
      { value: '1994', label: '1994' },
      { value: '1995', label: '1995' },
      { value: '1996', label: '1996' },
      { value: '1997', label: '1997' },
      { value: '1998', label: '1998' },
      { value: '1999', label: '1999' },
      { value: '2000', label: '2000' },
      { value: '2001', label: '2001' },
      { value: '2002', label: '2002' },
      { value: '2003', label: '2003' },
      { value: '2004', label: '2004' },
      { value: '2005', label: '2005' },
      { value: '2006', label: '2006' },
      { value: '2007', label: '2007' },
      { value: '2008', label: '2008' },
      { value: '2009', label: '2009' },
      { value: '2010', label: '2010' },
      { value: '2011', label: '2011' },
      { value: '2012', label: '2012' },
      { value: '2013', label: '2013' },
      { value: '2014', label: '2014' },
      { value: '2015', label: '2015' },
      { value: '2016', label: '2016' },
      { value: '2017', label: '2017' },
      { value: '2018', label: '2018' },
      { value: '2019', label: '2019' },
      { value: '2020', label: '2020' }
    ];

    this.frmUnidad.reset();
  }

  openEditar(value: any) {


    let idOperacion, idUsuario;
    idOperacion = +this.route.snapshot.queryParams['idOperacion'];
    idUsuario = +this.route.snapshot.queryParams['idUsuario'];

    this.busy = this.service.get('unidad/obtenerunidadbyoperacionddl', { 'idUsuario': idUsuario, 'idOperacion': idOperacion }).then(
      data => {
        this.unidadesDDL = data
      },
      error => {
        this.errorMessage = <any>error
        console.log(this.errorMessage)
        this.msgs.push({ severity: 'error', summary: 'Error', detail: this.errorMessage });
      }
    );

    this.busy = this.service.get('unidad/obtenersucursalASE', { 'idUsuario': 0 }).then(
      data => {
        this.sucursalesDDL = data
        this.SetSucursal()
      },
      error => {
        this.errorMessage = <any>error
        console.log(this.errorMessage)
        this.msgs.push({ severity: 'error', summary: 'Error', detail: this.errorMessage });
      }
    );

    this.modelosDDL = [
      { value: '1980', label: '1980' },
      { value: '1981', label: '1981' },
      { value: '1982', label: '1982' },
      { value: '1983', label: '1983' },
      { value: '1984', label: '1984' },
      { value: '1985', label: '1985' },
      { value: '1986', label: '1986' },
      { value: '1987', label: '1987' },
      { value: '1988', label: '1988' },
      { value: '1989', label: '1989' },
      { value: '1990', label: '1990' },
      { value: '1991', label: '1991' },
      { value: '1992', label: '1992' },
      { value: '1993', label: '1993' },
      { value: '1994', label: '1994' },
      { value: '1995', label: '1995' },
      { value: '1996', label: '1996' },
      { value: '1997', label: '1997' },
      { value: '1998', label: '1998' },
      { value: '1999', label: '1999' },
      { value: '2000', label: '2000' },
      { value: '2001', label: '2001' },
      { value: '2002', label: '2002' },
      { value: '2003', label: '2003' },
      { value: '2004', label: '2004' },
      { value: '2005', label: '2005' },
      { value: '2006', label: '2006' },
      { value: '2007', label: '2007' },
      { value: '2008', label: '2008' },
      { value: '2009', label: '2009' },
      { value: '2010', label: '2010' },
      { value: '2011', label: '2011' },
      { value: '2012', label: '2012' },
      { value: '2013', label: '2013' },
      { value: '2014', label: '2014' },
      { value: '2015', label: '2015' },
      { value: '2016', label: '2016' },
      { value: '2017', label: '2017' },
      { value: '2018', label: '2018' },
      { value: '2019', label: '2019' },
      { value: '2020', label: '2020' }
    ];



    this.openModal.nativeElement.click()

    this.frmUnidad = this.fb.group({
      'idUnidad': [value.idUnidad],
      'idUsuario': [value.idUsuario],
      'idSucursal': [value.idSucursal],
      'idUnidadOperativa': [value.idUnidadOperativa],
      'idTipoUnidad': [value.idTipoUnidad],
      'numeroEconomico': [value.numeroEconomico, Validators.required],
      'vin': [value.vin, Validators.required],
      'placas': [value.placas, Validators.required],
      'modelo': [value.modelo, Validators.required],
      'frente': [null],
      'derecho': [null],
      'izquierdo': [null],
      'atras': [null],
      'tarjeta': [null],
      'repuve': [null],
      'placavin': [null],
      'autorizacion': [null],
      'verificacionAmbiental': [null],
      'fechaVencimientoVerificacionAmbiental': [null],
      'verificacionFisicoMecanica': [null],
      'fechaVencimientoVerificacionFisicoMecanica': [null],
      'refrendo': [null],
      'fechaVencimientoRefrendo': [null],
      'tenencia': [null],
      'fechaVencimientoTenencia': [null]
    });
  }

  saveUnidad(value: string): void {
    let parametros = JSON.parse(JSON.stringify(value));
    parametros.idUsuario = 1

    //JSON.parse(localStorage.getItem("userASE")).idUsuario
    if (this.uploadedFR.length > 0) {
      parametros.frente = this.uploadedFR[0].uploadName
    }
    if (this.uploadedDE.length > 0) {
      parametros.derecho = this.uploadedDE[0].uploadName
    }
    if (this.uploadedIZ.length > 0) {
      parametros.izquierdo = this.uploadedIZ[0].uploadName
    }
    if (this.uploadedAT.length > 0) {
      parametros.atras = this.uploadedAT[0].uploadName
    }
    if (this.uploadedTA.length > 0) {
      parametros.tarjeta = this.uploadedTA[0].uploadName
    }
    if (this.uploadedAU.length > 0) {
      parametros.autorizacion = this.uploadedAU[0].uploadName
    }
    if (this.uploadedRE.length > 0) {
      parametros.repuve = this.uploadedRE[0].uploadName
    }
    if (this.uploadedVI.length > 0) {
      parametros.placavin = this.uploadedVI[0].uploadName
    }
    if (this.uploadedVA.length > 0) {
      parametros.verificacionAmbiental = this.uploadedVA[0].uploadName
    }
    if (this.uploadedVFM.length > 0) {
      parametros.verificacionFisicoMecanica = this.uploadedVFM[0].uploadName
    }
    if (this.uploadedREF.length > 0) {
      parametros.refrendo = this.uploadedREF[0].uploadName
    }
    if (this.uploadedTEN.length > 0) {
      parametros.tenencia = this.uploadedTEN[0].uploadName
    }
    this.busy = this.service.post('unidad/agregarunidadASE', parametros).then(
      data => {
        this.msgs.push({ severity: 'success', summary: 'Éxito', detail: 'Unidad agregada.' });
        this.reload()
        this.uploadedFR = [];
        this.uploadedDE = [];
        this.uploadedIZ = [];
        this.uploadedAT = [];
        this.uploadedTA = [];
        this.uploadedAU = [];
        this.uploadedRE = [];
        this.uploadedVI = [];
        this.uploadedVA = [];
        this.uploadedVFM = [];
        this.uploadedREF = [];
        this.uploadedTEN = [];
        this.frmUnidad.reset();
        this.closeModal.nativeElement.click();
      },
      error => {
        this.errorMessage = <any>error
        console.log(this.errorMessage)
        this.msgs.push({ severity: 'error', summary: 'Error', detail: this.errorMessage });
      }
    );
  }

  eliminarVerificacion(unidad: any): void {
    this.confirmationService.confirm({
      message: '¿Desea eliminar esta unidad del panque vehicular verificado?',
      accept: () => {
        this.busy = this.service.put('unidad/quitarverificacion', unidad).then(
          data => {
            this.msgs.push({ severity: 'success', summary: 'Éxito', detail: 'Unidad eliminada del parque vehicular autorizado.' });
            this.reload()
          },
          error => {
            this.errorMessage = <any>error
            console.log(this.errorMessage)
            this.msgs.push({ severity: 'error', summary: 'Error', detail: this.errorMessage });
          }
        );
      }

    });
  }

  //frente
  onUploadFR(event) {
    for (let file of event.files) {
      file.uploadName = event.xhr.response
      //Para cargar un solo documento a la vez
      this.uploadedFR = [];
      this.uploadedFR.push(file);
    }
    this.msgs.push({ severity: 'info', summary: 'Éxito', detail: 'Archivo cargado correctamente' });
  }

  deleteUploadedFR(key): void {
    var index = this.uploadedFR.indexOf(key, 0);
    if (index > -1) {
      this.uploadedFR.splice(index, 1);
    }
  }

  //  uploadedDE: any[] = []; Derecha
  onUploadDE(event) {
    for (let file of event.files) {
      file.uploadName = event.xhr.response
      //Para cargar un solo documento a la vez
      this.uploadedDE = [];
      this.uploadedDE.push(file);
    }
    this.msgs.push({ severity: 'info', summary: 'Éxito', detail: 'Archivo cargado correctamente' });
  }

  deleteUploadedDE(key): void {
    var index = this.uploadedDE.indexOf(key, 0);
    if (index > -1) {
      this.uploadedDE.splice(index, 1);
    }
  }

  //uploadedIZ: any[] = []; Izquierda
  onUploadIZ(event) {
    for (let file of event.files) {
      file.uploadName = event.xhr.response
      //Para cargar un solo documento a la vez
      this.uploadedIZ = [];
      this.uploadedIZ.push(file);
    }
    this.msgs.push({ severity: 'info', summary: 'Éxito', detail: 'Archivo cargado correctamente' });
  }

  deleteUploadedIZ(key): void {
    var index = this.uploadedIZ.indexOf(key, 0);
    if (index > -1) {
      this.uploadedIZ.splice(index, 1);
    }
  }

  //uploadedAT: any[] = []; Atrás
  onUploadAT(event) {
    for (let file of event.files) {
      file.uploadName = event.xhr.response
      //Para cargar un solo documento a la vez
      this.uploadedAT = [];
      this.uploadedAT.push(file);
    }
    this.msgs.push({ severity: 'info', summary: 'Éxito', detail: 'Archivo cargado correctamente' });
  }

  deleteUploadedAT(key): void {
    var index = this.uploadedAT.indexOf(key, 0);
    if (index > -1) {
      this.uploadedAT.splice(index, 1);
    }
  }

  //uploadedTA: any[] = []; Tarjeta
  onUploadTA(event) {
    for (let file of event.files) {
      file.uploadName = event.xhr.response
      //Para cargar un solo documento a la vez
      this.uploadedTA = [];
      this.uploadedTA.push(file);
    }
    this.msgs.push({ severity: 'info', summary: 'Éxito', detail: 'Archivo cargado correctamente' });
  }

  deleteUploadedTA(key): void {
    var index = this.uploadedTA.indexOf(key, 0);
    if (index > -1) {
      this.uploadedTA.splice(index, 1);
    }
  }

  //REPUVE
  onUploadRE(event) {
    for (let file of event.files) {
      file.uploadName = event.xhr.response
      //Para cargar un solo documento a la vez
      this.uploadedRE = [];
      this.uploadedRE.push(file);
    }
    this.msgs.push({ severity: 'info', summary: 'Éxito', detail: 'Archivo cargado correctamente' });
  }

  deleteUploadedRE(key): void {
    var index = this.uploadedRE.indexOf(key, 0);
    if (index > -1) {
      this.uploadedRE.splice(index, 1);
    }
  }

  //Placa VIN
  onUploadVI(event) {
    for (let file of event.files) {
      file.uploadName = event.xhr.response
      //Para cargar un solo documento a la vez
      this.uploadedVI = [];
      this.uploadedVI.push(file);
    }
    this.msgs.push({ severity: 'info', summary: 'Éxito', detail: 'Archivo cargado correctamente' });
  }

  deleteUploadedVI(key): void {
    var index = this.uploadedVI.indexOf(key, 0);
    if (index > -1) {
      this.uploadedVI.splice(index, 1);
    }
  }

  //VERIFICACION AMBIENTAL
  onUploadVA(event) {
    for (let file of event.files) {
      file.uploadName = event.xhr.response
      //Para cargar un solo documento a la vez
      this.uploadedVA = [];
      this.uploadedVA.push(file);
    }
    this.msgs.push({ severity: 'info', summary: 'Éxito', detail: 'Archivo cargado correctamente' });
  }

  deleteUploadedVA(key): void {
    var index = this.uploadedVA.indexOf(key, 0);
    if (index > -1) {
      this.uploadedVA.splice(index, 1);
    }
  }

  //VERIFICACION FISICO MECANICA
  onUploadVFM(event) {
    for (let file of event.files) {
      file.uploadName = event.xhr.response
      //Para cargar un solo documento a la vez
      this.uploadedVFM = [];
      this.uploadedVFM.push(file);
    }
    this.msgs.push({ severity: 'info', summary: 'Éxito', detail: 'Archivo cargado correctamente' });
  }

  deleteUploadedVFM(key): void {
    var index = this.uploadedVFM.indexOf(key, 0);
    if (index > -1) {
      this.uploadedVFM.splice(index, 1);
    }
  }

  //REFRENDO
  onUploadREF(event) {
    for (let file of event.files) {
      file.uploadName = event.xhr.response
      //Para cargar un solo documento a la vez
      this.uploadedREF = [];
      this.uploadedREF.push(file);
    }
    this.msgs.push({ severity: 'info', summary: 'Éxito', detail: 'Archivo cargado correctamente' });
  }

  deleteUploadedREF(key): void {
    var index = this.uploadedREF.indexOf(key, 0);
    if (index > -1) {
      this.uploadedVFM.splice(index, 1);
    }
  }

  //TENENCIA
  onUploadTEN(event) {
    for (let file of event.files) {
      file.uploadName = event.xhr.response
      //Para cargar un solo documento a la vez
      this.uploadedTEN = [];
      this.uploadedTEN.push(file);
    }
    this.msgs.push({ severity: 'info', summary: 'Éxito', detail: 'Archivo cargado correctamente' });
  }

  deleteUploadedTEN(key): void {
    var index = this.uploadedTEN.indexOf(key, 0);
    if (index > -1) {
      this.uploadedVFM.splice(index, 1);
    }
  }

  //uploadedAU: any[] = []; Autorizacion
  onUploadAU(event) {
    for (let file of event.files) {
      file.uploadName = event.xhr.response
      //Para cargar un solo documento a la vez
      this.uploadedAU = [];
      this.uploadedAU.push(file);
    }
    this.msgs.push({ severity: 'info', summary: 'Éxito', detail: 'Archivo cargado correctamente' });
  }

  SetSucursal(): void {
    this.busy = this.service.get('unidad/obteneruoASE', {
      'idZona': this.frmUnidad.controls['idSucursal'].value
    }).then(
      data => {
        this.ouDDL = data
      },
      error => {
        this.errorMessage = <any>error
        console.log(this.errorMessage)
        this.msgs.push({ severity: 'error', summary: 'Error', detail: this.errorMessage });
      }
      );
  }

  deleteUploadedAU(key): void {
    var index = this.uploadedAU.indexOf(key, 0);
    if (index > -1) {
      this.uploadedAU.splice(index, 1);
    }
  }


  verDocumento(doc: any): void {
    //   this.msgs.push({ severity: 'success', summary: 'Éxito', detail: 'Archivo descargado.' });
    window.open(this.URL + doc.nombre, '_blank')
  }

  esVencida(fecha: Date): boolean {
    var currentDate = new Date();
    var newDate = new Date(fecha);
    if (currentDate.getDate() > newDate.getDate())
      return true;
    else
      return false;
  }

}
