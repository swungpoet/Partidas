import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { SelectItem } from 'primeng/primeng';

import { BackendService } from '../services/backend.service';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';

import { ModalModule } from "ng2-modal";

import { Message } from 'primeng/primeng';
import { Router } from '@angular/router';
//import { Router, ActivatedRoute, Params } from '@angular/router';

//Gestión de Formas
import { FormControl } from "@angular/forms";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  
import { PARAMS } from '../services/params';

@Component({
  selector: 'app-unidades',
  templateUrl: './unidades.component.html',
  styleUrls: ['./unidades.component.css']
})

export class UnidadesComponent implements OnInit {

  //Listas de elementos
  unidades: any[] = [];
  marcas: any[];
  marcasDDL: any[];
  submarcas: any[];
  submarcasDDL: any[];
  modelosDDL: any[];
  tiposDDL: any[];
  URL: string;
  URLDocs: string;
  
  //Columnas de GRID
  colsMarca: any[];
  colsSubMarca: any[];
  colsUnidad: any[];
  errorMessage: string;
  tiposCombustible: any[];
  cilindrosDDL: any[];

  busy: Promise<any>;
  msgs: Message[] = [];
  uploaded: any[] = [];

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
    private fb: FormBuilder,
    
  ) {

    this.URL = PARAMS.url;
    this.URLDocs = PARAMS.urlDocs;
    //Columnas marcas
    this.colsMarca = [
      { field: 'idMarca', header: 'ID' },
      { field: 'marca', header: 'Marca' }
    ];

    //Formulario de alta de marcas
    this.frmMarca = fb.group({
      'marca': [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(200)])],
    });

    //Columnas sub marcas
    this.colsSubMarca = [
      { field: 'idSubMarca', header: 'ID' },
      { field: 'marca', header: 'Marca' },
      { field: 'subMarca', header: 'SubMarca' }
    ];

    //Formulario de alta de SubMarcas
    this.frmSubMarca = fb.group({
      'idSubMarca': [null],
      'idMarca': [null, Validators.required],
      'subMarca': [null, Validators.compose([Validators.required, Validators.minLength(1)])]
    });

    //Columnas modelos
    this.colsUnidad = [
      { field: 'idUnidad', header: 'ID', width: '70px' },
      { field: 'tipoCombustible', header: 'TipoCombustible', width: '120px' },
      { field: 'tipoUnidad', header: 'Clase' , width: '150px'},
      { field: 'marca', header: 'Marca' , width: '200px'},
      { field: 'subMarca', header: 'SubMarca' , width: '300px'},
      { field: 'cilindros', header: 'Cilindros' , width: '120px'}
    ];

    //Formulario de alta de Modelos
    this.frmUnidad = fb.group({
      'idUnidad': [null],
      'idTipoCombustible': [null, Validators.required],
      'idTipoUnidad': [null, Validators.required],
      'idSubMarca': [null, Validators.required],
      'idCilindros': [null, Validators.required],
      'foto': [null]
    });

  }

  ngOnInit() {
    //Cargo la información de inicio
    this.reload();
  }

  reload(): void {
    this.busy = this.service.get('unidad/obtenerunidad', { 'idUsuario': 0 }).then(
      data => {
        this.unidades = data
      },
      error => {
        this.errorMessage = <any>error
        console.log(this.errorMessage)
      }
    );
    this.busy = this.service.get('unidad/obtenertiposddl', { 'idUsuario': 0 }).then(
      data => {
        // Agregar la consulta para Clases
        this.tiposDDL = data

      },
      error => {
        this.errorMessage = <any>error
        console.log(this.errorMessage)
      }
    );

    ////////////////GESTION DE MODELOS
    this.busy = this.service.get('unidad/obtenertipocombustibleddl', { 'idUsuario': 0 }).then(
      data => {
        // Agregar la consulta para Clases
        this.tiposCombustible = data;
      },
      error => {
        this.errorMessage = <any>error
        console.log(this.errorMessage)
      }
    );

    this.busy = this.service.get('unidad/obtenercilindrosddl', { 'idUsuario': 0 }).then(
      data => {
        // Agregar la consulta para Clases
        this.cilindrosDDL = data;
      },
      error => {
        this.errorMessage = <any>error
        console.log(this.errorMessage)
      }
    );
  }

  /////////////GESTIÓN DE MARCAS
  onOpenMarca(): void {
    this.loadMarca();
  }

  loadMarca(): void {
    this.busy = this.service.get('unidad/obtenermarca', { 'idUsuario': 0 }).then(
      data => {
        this.marcas = data
      },
      error => {
        this.errorMessage = <any>error
        console.log(this.errorMessage)
      }
    );
  }

  loadMarcaDDL(): void {
    this.busy = this.service.get('unidad/obtenermarcaddl', { 'idUsuario': 0 }).then(
      data => {
        this.marcasDDL = data
      },
      error => {
        this.errorMessage = <any>error
        console.log(this.errorMessage)
      }
    );
  }

  saveMarca(value: string): void {
    let parametros = JSON.parse(JSON.stringify(value));
    this.busy = this.service.post('unidad/agregarmarca', parametros).then(
      data => {
        alert('Marca Agregada.');
        this.loadMarca()
        this.frmMarca.reset();
      },
      error => {
        this.errorMessage = <any>error
        console.log(this.errorMessage)
      }
    );
  }

  eliminarMarca(marca: any): void {
    if (confirm('¿Desea eliminar esta marca?')) {
      this.busy = this.service.delete('unidad/eliminarmarca', marca).then(
        data => {
          alert('Marca Eliminada.');
          this.loadMarca()
        },
        error => {
          this.errorMessage = <any>error
          console.log(this.errorMessage)
        }
      );
    }
  }

  /////////////GESTIÓN DE SUBMARCAS
  onOpenSubMarca(): void {
    this.loadSubMarca()
    this.loadMarcaDDL()
  }

  loadSubMarca(): void {
    this.busy = this.service.get('unidad/obtenersubmarca', { 'idUsuario': 0 }).then(
      data => {
        this.submarcas = data
      },
      error => {
        this.errorMessage = <any>error
        console.log(this.errorMessage)
      }
    );
  }

  saveSubMarca(value: string): void {
    let parametros = JSON.parse(JSON.stringify(value));
    this.busy = this.service.post('unidad/agregarsubmarca', parametros).then(
      data => {
        alert('SubMarca Agregada.');
        this.loadSubMarca()
        this.frmSubMarca.reset();
      },
      error => {
        this.errorMessage = <any>error
        console.log(this.errorMessage)
      }
    );
  }

  eliminarSubMarca(marca: any): void {
    if (confirm('¿Desea eliminar esta SubMarca?')) {
      this.busy = this.service.delete('unidad/eliminarsubmarca', marca).then(
        data => {
          alert('SubMarca Eliminada.');
          this.loadSubMarca()
        },
        error => {
          this.errorMessage = <any>error
          console.log(this.errorMessage)
        }
      );
    }
  }

  ////////////////GESTION DE MODELOS
  onOpenModelo(): void {
    this.busy = this.service.get('unidad/obtenersubmarcaddl', { 'idUsuario': 0 }).then(
      data => {
        this.submarcasDDL = data
      },
      error => {
        this.errorMessage = <any>error
        console.log(this.errorMessage)
      }
    );

  }

  saveUnidad(value: string): void {
    let parametros = JSON.parse(JSON.stringify(value));
    if (this.uploaded.length > 0) {
      parametros.foto = this.uploaded[0].uploadName
    }
    if (parametros.idUnidad == null) {
      this.busy = this.service.post('unidad/agregarunidad', parametros).then(
        data => {
          this.msgs.push({ severity: 'success', summary: 'Éxito', detail: 'Unidad agregada.' });
          this.reload()
          this.uploaded = [];
          this.frmUnidad.reset();
          this.closeModal.nativeElement.click();
        },
        error => {
          this.errorMessage = <any>error
          console.log(this.errorMessage)
        }
      );
    }
    else {
      this.busy = this.service.put('unidad/actualizarunidad', parametros).then(
        data => {
          this.msgs.push({ severity: 'success', summary: 'Éxito', detail: 'Unidad actualizada.' });
          this.reload()
          this.uploaded = [];
          this.frmUnidad.reset();
          this.closeModal.nativeElement.click();
        },
        error => {
          this.errorMessage = <any>error
          console.log(this.errorMessage)
        }
      );
    }
  }

  openEditar(unidad: any) {
    this.frmUnidad = this.fb.group({
      'idUnidad': [unidad.idUnidad],
      'idTipoCombustible': [unidad.idTipoCombustible, Validators.required],
      'idTipoUnidad': [unidad.idTipoUnidad, Validators.required],
      'idSubMarca': [unidad.idSubMarca, Validators.required],
      'idCilindros': [unidad.idCilindros, Validators.required],
      'foto': [unidad.foto]
    });
    this.openModal.nativeElement.click()
  }

  eliminarUnidad(unidad: any): void {
    this.confirmationService.confirm({
      message: '¿Desea eliminar esta unidad?',
      accept: () => {
        this.busy = this.service.delete('unidad/eliminarunidad', unidad).then(
          data => {
            this.msgs.push({ severity: 'success', summary: 'Éxito', detail: 'Unidad eliminada.' });
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

  onUpload(event) {
    for (let file of event.files) {
      file.uploadName = event.xhr.response
      //Para cargar un solo documento a la vez
      this.uploaded = [];
      this.uploaded.push(file);
    }
    this.msgs.push({ severity: 'info', summary: 'Éxito', detail: 'Archivo cargado correctamente' });
  }

  deleteUploaded(key): void {
    var index = this.uploaded.indexOf(key, 0);
    if (index > -1) {
      this.uploaded.splice(index, 1);
    }
  }

  verDocumento(doc: any): void {
    //   this.msgs.push({ severity: 'success', summary: 'Éxito', detail: 'Archivo descargado.' });
    window.open(URL + doc.nombre, '_blank')
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
