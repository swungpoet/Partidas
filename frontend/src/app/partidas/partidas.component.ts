import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { SelectItem } from 'primeng/primeng';

import { BackendService } from '../services/backend.service';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';

import { ModalModule } from "ng2-modal";

import { Message } from 'primeng/primeng';
import { Router } from '@angular/router';

//Gestión de Formas
import { FormControl } from "@angular/forms";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PARAMS } from '../services/params';

@Component({
  selector: 'app-partidas',
  templateUrl: './partidas.component.html',
  styleUrls: ['./partidas.component.css']
})

export class PartidasComponent implements OnInit {
  URL: string;
  URLDocs: string;
  //Listas de elementos
  partidas: any[] = [];
  partidasDDL: any[];
  cantidad: number = 1;
  kits: any[];
  pks: any[];
  unidadesDDL: any[];
  tiposDDL: any[];
  unidad: any;
  especialidadesDDL: any[];
  clasificacionesDDL: any[];
  subClasificacionesDDL: any[];



  //Columnas de GRID
  cols: any[];
  colsKit: any[];
  errorMessage: string;

  busy: Promise<any>;
  msgs: Message[] = [];
  uploadedFoto: any[] = [];
  uploadedInstructivo: any[] = [];

  selectedUnidad: any;
  selectedPartida: any;
  selectedPartidas: any[] = [];

  fb: FormBuilder;
  frmPartida: FormGroup;
  frmKit: FormGroup;

  //Modal Partidas
  @ViewChild('btnClose')
  closeModal: ElementRef
  @ViewChild('btnOpen')
  openModal: ElementRef

  //Modal Kits
  @ViewChild('btnOpenKit')
  openModalKit: ElementRef
  @ViewChild('btnCloseKit')
  closeModalKit: ElementRef

  //Modal Partidas del KIT
  @ViewChild('btnOpenPK')
  openModalPK: ElementRef
  @ViewChild('btnClosePK')
  closeModalPK: ElementRef


  constructor(
    private service: BackendService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {
    this.URL = PARAMS.url;
    this.URLDocs = PARAMS.urlDocs + 'partidas/';
    this.fb = new FormBuilder();
    this.unidad = {};

    this.cols = [
      { field: 'idPartida', header: 'ID', width: '50px' },
      { field: 'tipoPartida', header: 'Tipo', width: '160px' },
      { field: 'especialidad', header: 'Especialidad', width: '160px' },
      { field: 'clasificacion', header: 'Clasificación', width: '180px' },
      { field: 'subClasificacion', header: 'SubClasificación', width: '150px' },
      { field: 'partida', header: 'Partida', width: '120px' },
      { field: 'noParte', header: 'Parte', width: '120px' },
      { field: 'marca', header: 'Marca', width: '100px' },
      { field: 'descripcion', header: 'Descripción', width: '400px' }
    ];

    this.colsKit = [
      { field: 'idKit', header: 'ID', width: '50px' },
      { field: 'partida', header: 'Partida', width: '150px' },
      { field: 'descripcion', header: 'Descripción', width: '350px' }
    ];

    //Formulario de alta de Modelos
    this.frmPartida = this.fb.group({
      'idPartida': [null],
      'idUnidad': [null],
      'idTipoPartida': [null, Validators.required],
      'idEspecialidad': [null, Validators.required],
      'idPartidaClasificacion': [null, Validators.required],
      'idPartidaSubClasificacion': [null, Validators.required],
      'partida': [null, Validators.required],
      'noParte': [null, Validators.required],
      'descripcion': [null, Validators.required],
      'marca': [null],
      'foto': [null],
      'instructivo': [null]
    });

    this.frmKit = this.fb.group({
      'idKit': [null],
      'idUnidad': [null],
      'partida': [null, Validators.required],
      'descripcion': [null, Validators.required],
      'instructivo': [null]
    });

  }

  ngOnInit() {
    //Obtengo la lista de unidades
    this.busy = this.service.get('unidad/obtenerunidadddl', { 'idUsuario': 0 }).then(
      data => {
        this.unidadesDDL = data;
      },
      error => {
        this.errorMessage = <any>error
        console.log(this.errorMessage)
      }
    );

  }

  setUnidad(): void {
    //Cargo la información de inicio
    this.reload();
    this.busy = this.service.get('unidad/obtenerunidadbyid', {
      'idUnidad': this.selectedUnidad
    }).then(
      data => {
        this.unidad = data[0];
      },
      error => {
        this.errorMessage = <any>error
        console.log(this.errorMessage)
      }
      );
  }


  reload(): void {
    this.busy = this.service.get('partida/obtenertodas', {
      'idUsuario': 0,
      'idUnidad': this.selectedUnidad
    }).then(
      data => {
        this.partidas = data
        this.busy = this.service.get('partida/obtenerpartidasddl', {
          'idUsuario': 0,
          'idUnidad': this.selectedUnidad
        }).then(
          data => {
            this.partidasDDL = data
          },
          error => {
            this.errorMessage = <any>error
            console.log(this.errorMessage)
          }
          );
      },
      error => {
        this.errorMessage = <any>error
        console.log(this.errorMessage)
      }
      );

    this.busy = this.service.get('kit/obtenertodos', {
      'idUsuario': 0,
      'idUnidad': this.selectedUnidad
    }).then(
      data => {
        this.kits = data
      },
      error => {
        this.errorMessage = <any>error
        console.log(this.errorMessage)
      }
      );
    this.initModal();
    this.initModalKit();
  }

  ////////////////GESTION DE MODELOS
  initModal(): void {
    this.busy = this.service.get('partida/obtenernopartida', {
      'idUnidad': this.selectedUnidad
    }).then(
      data => {
        this.frmPartida = this.fb.group({
          'idPartida': [null],
          'idUnidad': [this.selectedUnidad],
          'idTipoPartida': [null, Validators.required],
          'idEspecialidad': [null, Validators.required],
          'idPartidaClasificacion': [null, Validators.required],
          'idPartidaSubClasificacion': [null, Validators.required],
          'partida': [data[0].partida, Validators.required],
          'noParte': [null, Validators.required],
          'marca': [null],
          'descripcion': [null, Validators.required],
          'foto': [null],
          'instructivo': [null]
        });
      },
      error => {
        this.errorMessage = <any>error
        console.log(this.errorMessage)
      }
      );

    this.busy = this.service.get('partida/obtenerespecialidadddl', { 'idUsuario': 0 }).then(
      data => {
        this.especialidadesDDL = data
      },
      error => {
        this.errorMessage = <any>error
        console.log(this.errorMessage)
      }
    );

    this.busy = this.service.get('partida/obtenertipoddl', null).then(
      data => {
        this.tiposDDL = data
      },
      error => {
        this.errorMessage = <any>error
        console.log(this.errorMessage)
      }
    );

    this.busy = this.service.get('partida/obtenerclasificacionddl', { 'idUsuario': 0 }).then(
      data => {
        this.clasificacionesDDL = data
      },
      error => {
        this.errorMessage = <any>error
        console.log(this.errorMessage)
      }
    );
    this.busy = this.service.get('partida/obtenersubclasificacionddl', { 'idUsuario': 0 }).then(
      data => {
        this.subClasificacionesDDL = data
      },
      error => {
        this.errorMessage = <any>error
        console.log(this.errorMessage)
      }
    );
  }

  save(value: string): void {
    let parametros = JSON.parse(JSON.stringify(value));
    if (this.uploadedFoto.length > 0) {
      parametros.foto = this.uploadedFoto[0].uploadName
    }
    if (this.uploadedInstructivo.length > 0) {
      parametros.instructivo = this.uploadedInstructivo[0].uploadName
    }
    if (parametros.idPartida == null) {
      this.busy = this.service.post('partida/agregar', parametros).then(
        data => {
          this.msgs.push({ severity: 'success', summary: 'Éxito', detail: 'Partida agregada.' });
          this.reload()
          this.uploadedFoto = [];
          this.uploadedInstructivo = [];
          this.frmPartida.reset();
          this.closeModal.nativeElement.click();
        },
        error => {
          this.errorMessage = <any>error
          console.log(this.errorMessage)
        }
      );
    }
    else {
      this.busy = this.service.put('partida/actualizar', parametros).then(
        data => {
          this.msgs.push({ severity: 'success', summary: 'Éxito', detail: 'Partida actualizada.' });
          this.reload()
          this.uploadedFoto = [];
          this.uploadedInstructivo = [];
          this.frmPartida.reset();
          this.closeModal.nativeElement.click();
        },
        error => {
          this.errorMessage = <any>error
          console.log(this.errorMessage)
        }
      );
    }
  }

 
  openEditar(value: any) {
    this.frmPartida = this.fb.group({
      'idPartida': [value.idPartida],
      'idUnidad': [value.idUnidad, Validators.required],
      'idTipoPartida': [value.idTipoPartida, Validators.required],
      'idEspecialidad': [value.idEspecialidad, Validators.required],
      'idPartidaClasificacion': [value.idPartidaClasificacion, Validators.required],
      'idPartidaSubClasificacion': [value.idPartidaSubClasificacion, Validators.required],
      'partida': [value.partida, Validators.required],
      'noParte': [value.noParte, Validators.required],
      'marca': [value.marca],
      'descripcion': [value.descripcion, Validators.required],
      'foto': [value.foto],
      'instructivo': [value.instructivo]

    });
    this.openModal.nativeElement.click()
  }


  eliminarPartida(unidad: any): void {
    this.confirmationService.confirm({
      message: '¿Desea eliminar esta partida?',
      accept: () => {
        this.busy = this.service.delete('partida/eliminar', unidad).then(
          data => {
            this.msgs.push({ severity: 'success', summary: 'Éxito', detail: 'Partida eliminada.' });
            this.reload()
          },
          error => {
            this.errorMessage = <any>error
            console.log(this.errorMessage)
          }
        );
      }
    });
  }

  onUploadFoto(event) {
    for (let file of event.files) {
      file.uploadName = event.xhr.response
      //Para cargar un solo documento a la vez
      this.uploadedFoto = [];
      this.uploadedFoto.push(file);
    }
    this.msgs.push({ severity: 'info', summary: 'Éxito', detail: 'Archivo cargado correctamente' });
  }

  deleteUploadedFoto(key): void {
    var index = this.uploadedFoto.indexOf(key, 0);
    if (index > -1) {
      this.uploadedFoto.splice(index, 1);
    }
  }

  onUploadInstructivo(event) {
    for (let file of event.files) {
      file.uploadName = event.xhr.response
      //Para cargar un solo documento a la vez
      this.uploadedInstructivo = [];
      this.uploadedInstructivo.push(file);
    }
    this.msgs.push({ severity: 'info', summary: 'Éxito', detail: 'Archivo cargado correctamente' });
  }

  deleteUploadedInstructivo(key): void {
    var index = this.uploadedInstructivo.indexOf(key, 0);
    if (index > -1) {
      this.uploadedInstructivo.splice(index, 1);
    }
  }

  //////////Administración de KITs

  initModalKit(): void {
    this.busy = this.service.get('kit/obtenernokit', {
      'idUnidad': this.selectedUnidad
    }).then(
      data => {
        this.frmKit = this.fb.group({
          'idKit': [null],
          'idUnidad': [this.selectedUnidad],
          'partida': [data[0].partida, Validators.required],
          'descripcion': [null, Validators.required],
          'instructivo': [null]
        });
      },
      error => {
        this.errorMessage = <any>error
        console.log(this.errorMessage)
      }
      );
  }

  AgregarPartidaKit(): void {
    let partidaNueva: any = {}
    partidaNueva.idPartida = this.selectedPartida
    partidaNueva.cantidad = this.cantidad
    partidaNueva.descripcion = this.partidasDDL.find(item => {
      return item.value == this.selectedPartida
    }).label
    this.selectedPartidas.push(partidaNueva)

    this.cantidad = 1
    this.selectedPartida = null
  }

  eliminarPartidaKit(value: any) {
    var indice = this.selectedPartidas.indexOf(this.selectedPartidas.find(item => {
      return item.idPartida == value.idPartida
    })); // obtenemos el indice
    this.selectedPartidas.splice(indice, 1);
  }

  saveKit(value: string): void {
    let parametros = JSON.parse(JSON.stringify(value));
    parametros.json = JSON.stringify(this.selectedPartidas)
    if (this.uploadedInstructivo.length > 0) {
      parametros.instructivo = this.uploadedInstructivo[0].uploadName
    }
    if (parametros.idKit == null) {

      this.busy = this.service.post('kit/agregar', parametros).then(
        data => {
          this.msgs.push({ severity: 'success', summary: 'Éxito', detail: 'Kit agregado.' });
          this.reload()
          this.uploadedInstructivo = [];
          this.frmKit.reset();
          this.closeModalKit.nativeElement.click();
          this.cantidad = 1
          this.selectedPartidas = null
        },
        error => {
          this.errorMessage = <any>error
          console.log(this.errorMessage)
        }
      );
    }
    else {
      this.busy = this.service.put('kit/actualizar', parametros).then(
        data => {
          this.msgs.push({ severity: 'success', summary: 'Éxito', detail: 'Kit actualizado.' });
          this.reload()
          this.uploadedInstructivo = [];
          this.frmKit.reset();
          this.closeModalKit.nativeElement.click();
          this.cantidad = 1
          this.selectedPartidas = null
        },
        error => {
          this.errorMessage = <any>error
          console.log(this.errorMessage)
        }
      );
    }

  }

  openEditarKit(value: any) {
    this.busy = this.service.get('kit/obtenerpartidas', { idKit: value.idKit }).then(
      data => {
        this.selectedPartidas = data;
        this.frmKit = this.fb.group({
          'idKit': [value.idKit],
          'idUnidad': [value.idUnidad],
          'partida': [value.partida, Validators.required],
          'descripcion': [value.descripcion, Validators.required],
          'instructivo': [value.instructivo]
        });
        this.openModalKit.nativeElement.click()
      },
      error => {
        this.errorMessage = <any>error
        console.log(this.errorMessage)
      }
    );
  }

  viewKit(value: any): void {
    this.busy = this.service.get('kit/obtenerpartidas', { idKit: value.idKit }).then(
      data => {
        this.pks = data
        this.openModalPK.nativeElement.click()
      },
      error => {
        this.errorMessage = <any>error
        console.log(this.errorMessage)
      }
    );
  }

  onExporting(e){
    e.component.beginUpdate();
    e.component.columnOption("Acción", "visible", false);
    e.component.columnOption("Instructivo", "visible", false);
    e.component.columnOption("Foto", "visible", false);
    
    //Se sustituye la columna personalizada por la columna original
    // e.component.columnOption("Descripción", "visible", false);
    // e.component.columnOption("Descripción", "caption", "DescripciónAux");    

    // e.component.columnOption("descripcion", "visible", true);
    // e.component.columnOption("descripcion", "caption", "Descripción");
  }

  onExported(e){
    e.component.columnOption("Acción", "visible", true);
    e.component.columnOption("Instructivo", "visible", true);
    e.component.columnOption("Foto", "visible", true);
    
    //Se sustituye la columna original por la columna personalizada
    // e.component.columnOption("Descripción", "caption", "descripcion");
    // e.component.columnOption("DescripciónAux", "caption", "Descripción");

    // e.component.columnOption("Descripción", "visible", true);    
    // e.component.columnOption("descripcion", "visible", false);
    e.component.endUpdate();
  }
}
