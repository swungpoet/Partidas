import { Http, Response, RequestOptions, Request, RequestMethod, Headers } from '@angular/http';

import { Component, OnInit, ElementRef, NgZone, ViewChild } from '@angular/core';
import { SelectItem } from 'primeng/primeng';


import { BackendService } from '../services/backend.service';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';

import { MapsAPILoader } from '@agm/core';

//Gestión de Formas
import { FormControl } from "@angular/forms";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PARAMS } from '../services/params';
//Google APPs Module
// import { AgmCoreModule } from "angular2-google-maps/core";
import { AgmCoreModule } from '@agm/core';
import { AgmMap, AgmMarker } from '@agm/core';

import { ModalModule } from "ng2-modal";
import { Message } from 'primeng/primeng';

import { Router, ActivatedRoute, Params } from '@angular/router';

import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';

import {
  DxSelectBoxModule,
  DxCheckBoxModule,
  DxTextBoxModule,
  DxDateBoxModule,
  DxButtonModule,
  DxValidatorModule,
  DxDropDownBoxModule,
  DxFormModule,
  DxListModule,
  DxValidationSummaryModule
} from 'devextreme-angular';

import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-nuevasucursal',
  templateUrl: './nuevasucursal.component.html',
  styleUrls: ['./nuevasucursal.component.css']
})

export class NuevaSucursalComponent implements OnInit {
  URL: string;
  URLDocs: string;

  errorMessage: string;
  msgs: Message[] = [];
  selectedTileViewItem
  dataSourceClas: any;
  dataSourceComb: any;
  tipoDocumentoDDL: any[] = []
  latitude: number;
  longitude: number;
  zoom: number;
  requestoptions: any
  addressList: any[] = []
  direccion
  evidencia
  imagen: string = ''
  menuItems

  busy: Promise<any>;
  tipos: any[];
  categoriasDDL: string[] = [];
  combustiblesList;
  selectedCombustible: any[] = [];
  documentosEncabezado: any[] = []
  documentosSucursal: any[] = []

  especialidadesDIESELList;
  especialidadesGasList
  selectedDIESEL: any[] = [];
  selectedGasolina: any[] = [];

  clasificacionSelect;
  clasificacionDDL: string[] = [];
  selectedClasificacion;

  frmImagen: FormGroup;

  selectedCategoria;
  especialidades: any[]
  idProveedor;
  idSucursal;
  proveedor;
  nombreComercial: string
  idProveedorEncabezado: any
  razonSocial: string
  RFC: string
  contacto: string
  telefono: string
  mail: string
  idCategoria;
  categoria: string
  idProveedorClasificacion: any
  idProveedorSubClasificacion: any
  fechaInicio: Date
  agregarImagen: boolean = false

  @ViewChild('btnCloseModalImagen')
  closeModalImagen: ElementRef

  @ViewChild('btnCloseModal')
  closeModalAdrress: ElementRef


  constructor(
    private service: BackendService,
    private confirmationService: ConfirmationService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private router: Router,
    private route: ActivatedRoute,
    private http: Http,
    private fb: FormBuilder,
  ) {

    this.URL = PARAMS.url;
    //this.URL = 'http://189.204.141.193:5500/api/';
    this.URLDocs = PARAMS.urlDocs;

    this.clasificacionSelect = []
    this.selectedDIESEL = []
    this.selectedGasolina = []
    this.selectedCategoria = ""
    this.selectedClasificacion = ""
    this.selectedCombustible = []
    this.idSucursal = null
    this.documentosEncabezado = []

    this.menuItems = [
      { text: 'Eliminar'}
    ];

    //this.fb = new FormBuilder()
    this.proveedor = {
      'idSucursal': [null],
      'idProveedor': [null],
      'nombreComercial': [null, Validators.required],
      'razonSocial': [null, Validators.required],
      'RFC': [null, Validators.required],
      'contacto': [null, Validators.required],
      'telefono': [null, Validators.required],
      'mail': [null, Validators.required],
      //'fechaInicio': [null, Validators.required],
      'fechaInicioFormato': [null],
      'idCategoria': [null, Validators.required],
      'categoria': [null, Validators.required],
      'selectedCategoria': [null, Validators.required],
      'idProveedorClasificacion': [null],
      'direccion': [null],
      //'nombreSucursal': [null],
      'selectedCombustible': [null],
      'selectedDIESEL': [null],
      'selectedGas': [null]
    };

    this.frmImagen = fb.group({
      'idDocumento': [null, Validators.required]
    })
  }
  ngOnInit() {

    this.reload()

    this.busy = this.service.get("proveedor/obtenerdocumentosucursalddl", {}).then(
      data => {
        this.tipoDocumentoDDL = data
      }, error => {
        console.log(<any>error)
        notify('error al obtener los tipos de documentos', 'error', 1000);
      }
    )

    this.busy = this.service.get('unidad/obtenertipocombustibleddl', { 'idUsuario': 0 }).then(
      data => {
        this.combustiblesList = new DataSource({
          store: new ArrayStore({
            key: 'value',
            data: data
          }),
          searchOperation: "contains",
          searchExpr: "text"
        });

        //this.combustiblesList = data.toString()
        // this.combustiblesList = new DataSource({
        //         store: data,
        //         searchOperation: "contains",
        //         searchExpr: "label"
        //       });
      },
      error => {
        console.log(<any>error)
        notify('error al obtener los tipos de combustible', 'error', 1000);
        this.msgs.push({ severity: 'error', summary: 'Error', detail: 'Error al obtener los tipos de combustible.' });
      }
    );

    this.busy = this.service.get('partida/obtenerespecialidadddl', { 'idUsuario': 0 }).then(
      data => {
        this.especialidadesGasList = new DataSource({
          store: new ArrayStore({
            key: 'value',
            data: data
          }),
          searchOperation: "contains",
          searchExpr: "text"
        });

        this.especialidadesDIESELList = new DataSource({
          store: new ArrayStore({
            key: 'value',
            data: data
          }),
          searchOperation: "contains",
          searchExpr: "text"
        });
      },
      error => {
        console.log(<any>error)
        notify('error al obtener las especialidades', 'error', 1000);
        this.msgs.push({ severity: 'error', summary: 'Error', detail: 'Error al obtener las especialidades.' });
      }
    );

    this.busy = this.service.get('proveedor/obtenercategoria', {
      'idUsuario': 0
    }).then(
      data => {
        this.categoriasDDL = []
        for (let tipo of data) {
          this.categoriasDDL.push(tipo.label)
        }
      },
      error => {
        this.errorMessage = <any>error
        console.log(this.errorMessage)
      }
      )

    let id = +this.route.snapshot.params['idProv']
    let idSucu = +this.route.snapshot.params['idSuc'];
    let clasification = []
    this.idProveedor = id
    this.idSucursal = idSucu
    if (isNaN(idSucu)) {
      this.agregarImagen = false
    } else {
      this.agregarImagen = true
    }
    //console.log(this.idProveedor)
    //console.log(this.idSucursal)

    if (!isNaN(id)) {
      this.busy = this.service.get('proveedor/obtenerencabezadobyid', {
        'idProveedorEncabezado': id

      }).then(
        data => {
          this.proveedor = {
            'idProveedor': id,
            'nombreComercial': data[0].nombreComercial,
            'razonSocial': data[0].razonSocial,
            'RFC': data[0].RFC,
            'fechaInicio': data[0].fechaInicio,
            //'fechaInicioFormato': [data[0].nombreComercial,],
            'idCategoria': data[0].idCategoria,
            'categoria': data[0].categoria,
            'selectedCategoria': data[0].categoria,
            //'idProveedorClasificacion': data[0].idProveedorClasificacion,
            'selectedCombustible': [],
            'selectedDIESEL': [],
            'selectedGas': []
          };

          this.busy = this.service.get('proveedor/obtenerdocumentosencabezado', { 'idProveedorEncabezado': this.proveedor.idProveedor }).then(
            data => {
              this.documentosEncabezado = data
            },
            error => {
              this.errorMessage = <any>error
              console.log(this.errorMessage)
            }
          );

          if (!isNaN(idSucu)) {

            this.busy = this.service.get('proveedor/obtenerbyid', {
              'idProveedor': this.idSucursal
            }).then(
              data => {
                //console.log(data)
                this.proveedor.idSucursal = idSucu,
                  this.proveedor.nombreSucursal = data[0].nombreComercial,
                  this.proveedor.selectedClasificacion = data[0].proveedorClasificacion,
                  this.proveedor.idProveedorClasificacion = data[0].idProveedorClasificacion,
                  this.proveedor.contacto = data[0].contacto,
                  this.proveedor.telefono = data[0].telefono,
                  this.proveedor.mail = data[0].mail,
                  this.proveedor.direccion = data[0].direccion,
                  this.proveedor.latitude = data[0].latitud,
                  this.proveedor.longitude = data[0].longitud,
                  this.proveedor.poligono = data[0].poligono
                //this.getLocation()
                this.latitude = parseFloat(data[0].latitud==null?0:data[0].latitud)
                this.longitude = parseFloat(data[0].longitud==null?0:data[0].longitud)

                this.zoom = 16;

                this.busy = this.service.get('proveedor/obtenerdocumentosucursalbyid', {
                  'idProveedor': idSucu
                }).then(
                  data => {
                    this.documentosSucursal = data
                  }, error => {
                    this.errorMessage = <any>error
                    console.log(this.errorMessage)
                  }
                  )

                this.busy = this.service.get('proveedor/obtenerespecialidadesbyid', {
                  'idProveedor': idSucu
                }).then(
                  data => {
                    //DIESEL
                    this.selectedDIESEL = []
                    for (let tipo of data.filter(function (object, key) {
                      return object.idTipoCombustible == 1;
                    })) {
                      this.proveedor.selectedDIESEL.push(tipo.idEspecialidad)
                    }
                    //Gasolina
                    this.proveedor.selectedGas = []
                    for (let tipo of data.filter(function (object, key) {
                      return object.idTipoCombustible == 2;
                    })) {
                      this.proveedor.selectedGas.push(tipo.idEspecialidad)
                    }
                  },
                  error => {
                    this.errorMessage = <any>error
                    console.log(this.errorMessage)
                  }
                  );

                this.busy = this.service.get('proveedor/obtenertiposcombustiblebyid', {
                  'idProveedor': idSucu
                }).then(
                  data => {
                    this.proveedor.selectedCombustible = []
                    for (let tipo of data) {
                      this.proveedor.selectedCombustible.push(tipo.idTipoCombustible)
                    }
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
          }

          this.busy = this.service.get('proveedor/obtenerclasificacion', {
            'idCategoria': data[0].idCategoria
          }).then(
            data => {
              this.clasificacionSelect = data
              this.clasificacionDDL = []
              for (let tipo of data) {
                this.clasificacionDDL.push(tipo.label)
              }

              //this.clasificacionDDL = data
              // if (this.proveedor.latitud != null && this.proveedor.latitud != '') {
              //   //Cargo el mapa
              //   this.latitude = parseFloat(this.proveedor.latitud)
              //   this.longitude = parseFloat(this.proveedor.longitud)
              //   this.zoom = 16;

              //   this.getLocation();
              // }

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
        )
    }




  }

  reload() {
  }

  searchCombustible(e) {
    this.combustiblesList.searchValue(e.value)
    this.combustiblesList.load()
  }

  searchDIESEL(e) {
    this.especialidadesDIESELList.searchValue(e.value)
    this.especialidadesDIESELList.load()
  }

  searchGasolina(e) {
    this.especialidadesGasList.searchValue(e.value)
    this.especialidadesGasList.load()
  }

  getAddress(event) {
    this.latitude = event.coords.lat
    this.longitude = event.coords.lng
    this.proveedor.latitude = event.coords.lat
    this.proveedor.longitude = event.coords.lng
    this.getLocation()
  }

  getLocation(): void {
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'location': new google.maps.LatLng(this.latitude, this.longitude) }, (results, status) => {
      this.ngZone.run(() => {
        if (status == google.maps.GeocoderStatus.OK) {
          if (results[0] != null) {
            this.proveedor.direccion = results[0].formatted_address;
          } else {
            alert("No address available");
          }
        }
      });
    });

  }

  getBusquedaGoogle(address: string): void {
    let URL = "https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAvJ3AAfkwsjYSVgVTedzomUz82nO9WP3Q&address=Mexico,"
    if (address == "") {
      notify('Npo existen los criterios de búsqueda.', 'error', 1000);
      this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No existen criterios de búsqueda.' });
      return
    }
    this.http.get(URL + address, this.requestoptions).subscribe(data => {
      let direccion: any = data.json().results
      if (data.json().status == "OK") {
        //POR CADA RESULTADO GENERAMOS LA LISTA
        this.addressList = []
        for (let _address of direccion) {
          this.addressList.push({
            'formatted_address': _address.formatted_address,
            'lat': _address.geometry.location.lat,
            'lng': _address.geometry.location.lng
          })
        }
      }
      else {
        notify('No existen coincidencias con el criterio.', 'error', 1000);
        this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No existen coincidencias con el crtierio.' });
        return;
      }

    })
  }

  onUpload(event) {
    this.evidencia = event.request.response
    this.msgs.push({ severity: 'info', summary: 'Éxito', detail: 'Archivo cargado correctamente' });
  }

  saveImagen(data) {
    let parametros = JSON.parse(JSON.stringify(data));
    parametros.evidencia = this.evidencia
    parametros.idProveedor = this.idSucursal
    this.busy = this.service.post("proveedor/agregardocumentosucursal", parametros).then(
      data => {
        this.busy = this.service.get('proveedor/obtenerdocumentosucursalbyid', {
          'idProveedor': this.idSucursal
        }).then(
          data => {
            this.documentosSucursal = data
          }, error => {
            this.errorMessage = <any>error
            console.log(this.errorMessage)
          }
          )

        this.closeModalImagen.nativeElement.click()
      }, error => {
        notify('No fue posible agregar el documento.', 'error', 1000);
        this.errorMessage = <any>error
        console.log(this.errorMessage)
        //this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No fue posible agregar el documento.' });
      }
    )
  }

  setAddress(address: any) {
    this.mapsAPILoader.load().then(() => {
      this.latitude = address.lat
      this.longitude = address.lng
      this.proveedor.latitude = address.lat
      this.proveedor.longitude = address.lng
      this.proveedor.direccion = address.formatted_address
      //this.direccion.setValue(address.formatted_address)
      this.zoom = 16;
      this.closeModalAdrress.nativeElement.click()
    })
  }

  onCombustibleSelectionChanged(e) {
    if (e.addedItems.length > 0) {
      for (let tipo of e.addedItems) {
        this.selectedCombustible.push(tipo)
      }
    } else {
      for (let tipo of e.removedItems) {
        this.selectedCombustible.splice(this.selectedCombustible.indexOf(tipo), 1)
      }
    }
  }

  onDIESELSelectionChanged(e) {
    if (e.addedItems.length > 0) {
      for (let tipo of e.addedItems) {
        this.selectedDIESEL.push(tipo)
      }
    } else {
      for (let tipo of e.removedItems) {
        this.selectedDIESEL.splice(this.selectedDIESEL.indexOf(tipo), 1)
      }
    }
  }

  onGasSelectionChanged(e) {
    if (e.addedItems.length > 0) {
      for (let tipo of e.addedItems) {
        this.selectedGasolina.push(tipo)
      }
    } else {
      for (let tipo of e.removedItems) {
        this.selectedGasolina.splice(this.selectedGasolina.indexOf(tipo), 1)
      }
    }
  }

  onClasificacionValueChanged(e) {
    //this.clasificacionSelect = []
    let clas = this.clasificacionSelect.find(X => X.label == e.value)
    if (clas) {
      this.proveedor.idProveedorClasificacion = clas.value
    }
  }

  cancelar() {
    this.router.navigate(['/proveedores']);
  }

  save() {

    console.log(this.selectedCombustible)
    console.log(this.selectedDIESEL)
    console.log(this.selectedGasolina)
    if (isNaN(this.idSucursal)) {
      console.log('Guardando')
      this.busy = this.service.post('proveedor/agregarsucursal', {
        'proveedor': this.proveedor, 'JSONCombustible': JSON.stringify(this.selectedCombustible),
        'JSONDIESEL': JSON.stringify(this.selectedDIESEL), 'JSONGasolina': JSON.stringify(this.selectedGasolina)
      }
      ).then(
        data => {
          notify('Sucursal agregada correctamente', 'success', 1000);
          this.msgs.push({ severity: 'success', summary: 'Éxito', detail: 'Sucursal agregada correctamente.' });
          this.router.navigate(['/proveedores'])
        }, error => {
          this.errorMessage = <any>error
          console.log(this.errorMessage)
          notify('No se pudo agregar la sucursal', 'error', 1000);
        }
        );
    } else {
      console.log('Actualizando')
      //console.log(this.proveedor)
      this.busy = this.service.put('proveedor/actualizarsucursal', {
        'proveedor': this.proveedor, 'JSONCombustible': JSON.stringify(this.selectedCombustible),
        'JSONDIESEL': JSON.stringify(this.selectedDIESEL), 'JSONGasolina': JSON.stringify(this.selectedGasolina)
      }
      ).then(
        data => {
          notify('Sucursal actualizada correctamente', 'success', 1000);
          this.msgs.push({ severity: 'success', summary: 'Éxito', detail: 'Sucursal actualizada correctamente.' });
          this.router.navigate(['/proveedores'])
        }, error => {
          this.errorMessage = <any>error
          console.log(this.errorMessage)
          notify('No se pudo actualizar la sucursal', 'error', 1000);
        }
        );
    }
  }

  onItemClick(e){
    if(e.itemIndex == 0){
      this.confirmationService.confirm({
        message: "¿Desea eliminar este documento (" + (this.selectedTileViewItem == null ? "" : this.selectedTileViewItem.descripcion) + ")?",
        accept: () => {
          this.busy = this.service.delete("proveedor/eliminardocumentosucursal", {
            'idProveedorDocumento': this.selectedTileViewItem.idProveedorDocumento
          }).then(
            data => {
              this.busy = this.service.get('proveedor/obtenerdocumentosucursalbyid', {
                'idProveedor': this.idSucursal
              }).then(
                data => {
                  this.documentosSucursal = data
                }, error => {
                  this.errorMessage = <any>error
                  console.log(this.errorMessage)
                }
                )
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
    for(var i = 0; i < this.documentosSucursal.length; i++){
      if(i == e.itemIndex){
        this.selectedTileViewItem = this.documentosSucursal[i]
      }
    }
  }
}