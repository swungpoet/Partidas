import { Component, OnInit, ElementRef, NgZone, ViewChild } from '@angular/core';
import { SelectItem, OrganizationChart } from 'primeng/primeng';

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

import { Router, ActivatedRoute, Params } from '@angular/router';

import { GoogleMap, Size, Point, LatLngLiteral } from '@agm/core/services/google-maps-types';

import { PARAMS } from '../services/params';
import { Http, RequestOptions, Response, Request } from '@angular/http';

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
import { parse } from 'url';
import { _getWindowLocation } from 'angularfire2';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})

export class MapaComponent implements OnInit {

  URLDocs: string;
  //Parámetros de alta
  proveedores: any[];
  errorMessage: string;

  TallerSelect;
  TallerDDL: string[] = [];
  selectedTaller;

  ubicaciones;

  busy: Promise<any>;
  msgs: Message[] = [];

  //Gestión de destino
  latitude: number;
  longitude: number;
  nombreOrigen: string = '';
  nombreDestino: string = '';
  zoom: number;

  public markers: marker[] = []

  //CONTROL DE TREELIST
  public AllZonas: any[] = []
  public AllZonasTree: any[] = []
  public zonaSelected: number;
  public isChild: boolean = false;

  //CONTROL DE POLYLINE
  public origen: any = [0, 0]
  public destino: any = [0, 0]
  requestoptions: any
  public distancia: String
  public tiempo: String


  constructor(
    private service: BackendService,
    private confirmationService: ConfirmationService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private route: ActivatedRoute,
    private router: Router,
    private http: Http) {
    this.URLDocs = PARAMS.urlDocs + 'partidas/';
  }

  ngOnInit() {
    let _idProveedor, _lat, _lng;
    _idProveedor = this.route.snapshot.queryParams['idProveedor'];
    _lat = this.route.snapshot.queryParams['latitud'];
    _lng = this.route.snapshot.queryParams['longitud'];

    //OBTENEMOS TODAS LAS ZONAS
    this.busy = this.service.get('zona/obtener', { 'idUsuario': '1' }).then(
      data => {
        this.AllZonas = data
        this.AllZonasTree = []
        for (let tipo of data) {
          if (tipo.idPadre == 0) {
            this.AllZonasTree.push({
              'nombreComercial': tipo.nombreComercial,
              'idNivelZona': tipo.idNivelZona,
              'nombre': tipo.nombre,
              'direccion': tipo.direccion,
              'latitud': tipo.latitud,
              'longitud': tipo.longitud,
              'idZona': tipo.idZona,
              'orden': tipo.orden,
              'maxOrden': tipo.maxOrden,
              'logo': tipo.logo
            })

          } else {
            this.AllZonasTree.push({
              'nombreComercial': tipo.nombreComercial,
              'idNivelZona': tipo.idNivelZona,
              'nombre': tipo.nombre,
              'direccion': tipo.direccion,
              'latitud': tipo.latitud,
              'longitud': tipo.longitud,
              'idZona': tipo.idZona,
              'idPadre': tipo.idPadre,
              'orden': tipo.orden,
              'maxOrden': tipo.maxOrden,
              'logo': tipo.logo
            })
          }
        }
      }, error => {
        this.errorMessage = <any>error
        console.log(this.errorMessage)
      }
    )


    //Init MAPS

    this.busy = this.service.get('proveedor/obtenerclasificacion', { 'idCategoria': 1 }).then(
      data => {
        this.TallerSelect = data
        this.TallerDDL = []
        for (let tipo of data) {
          this.TallerDDL.push(tipo.label)
        }

      }, error => {
        this.errorMessage = <any>error
        console.log(this.errorMessage)
      }
    )

    //Obtengo la lista de proveedores
    this.busy = this.service.get('proveedor/obtenermarcadores', { 'idUsuario': 0 }).then(
      data => {
        this.ubicaciones = data
        this.mapsAPILoader.load().then(() => {

          //set latitude, longitude and zoom
          for (let mk of data) {
            var mark = <marker>{}
            mark.lat = +mk.lat
            mark.lng = +mk.lng
            mark.label = mk.label
            mark.nombre = mk.nombre
            mark.direccion = mk.direccion
            mark.logo = mk.logo
            mark.clasificacion = mk.clasificacion
            mark.idProveedorEncabezado = mk.idProveedorEncabezado,
              mark.idProveedor = mk.idProveedor

            if (mark.clasificacion == "Taller Externo") {
              mark.icon = {
                url: this.URLDocs + "marker_taller.png",
                scaledSize: new google.maps.Size(30, 52)
              }
            }
            if (mark.clasificacion == "Llantera") {
              mark.icon = {
                url: this.URLDocs + "marker_llanta.png",
                scaledSize: new google.maps.Size(30, 52)
              }
            }
            if (mark.clasificacion == "Grua") {
              mark.icon = {
                url: this.URLDocs + "marker_grua.png",
                scaledSize: new google.maps.Size(30, 52)
              }
            }
            if (mark.clasificacion == "Agencia de Marca") {
              mark.icon = {
                url: this.URLDocs + "marker_agencia.png",
                scaledSize: new google.maps.Size(30, 52)
              }
            }
            if (mark.clasificacion == "Refaccionaria") {
              mark.icon = {
                url: this.URLDocs + "marker_refaccionaria.png",
                scaledSize: new google.maps.Size(30, 52)
              }
            }
            if (mark.clasificacion == "Remolques") {
              mark.icon = {
                url: this.URLDocs + "marker_remolques.png",
                scaledSize: new google.maps.Size(30, 52)
              }
            }
            if (mark.clasificacion == "Agencia Ford") {
              mark.icon = {
                url: this.URLDocs + "marker_ford.png",
                scaledSize: new google.maps.Size(30, 52)
              }
            }
            if (mark.clasificacion == "Agencia Nissan") {
              mark.icon = {
                url: this.URLDocs + "marker_nissan.png",
                scaledSize: new google.maps.Size(30, 52)
              }
            }
            this.markers.push(mark)
          }
        }
        );
      },
      error => {
        this.errorMessage = <any>error
        console.log(this.errorMessage)
      }
    );
//VERIFICAMOS SI SE PASAN PARAMETROS
    if (_idProveedor!=null && _lat != null && _lng != null)
    {
      this.latitude = parseFloat(_lat);
      this.longitude = parseFloat(_lng);
      this.zoom = 18;
      this.isChild = true;
    }
    else
    {
      this.zoom = 6;
      this.latitude = 23.735948;
      this.longitude = -102.445453;
    }

  }

  clickedMarker(lat: number, lon: number) {
    this.mapsAPILoader.load().then(() => {
      this.latitude = lat;
      this.longitude = lon;
      this.isChild = true;
      this.zoom = 18;
      //this.destino = [lat, lon]
     /* this.busy = this.service.get('google/distancia', {
        'latOrigen': this.origen[0],
        'lngOrigen': this.origen[1],
        'latDestino': this.destino[0],
        'lngDestino': this.destino[1]

      }).then(
        data => {
          let res: any = data
          this.distancia = res.rows[0].elements[0].distance.text
          this.tiempo = res.rows[0].elements[0].duration.text
        });*/

    });

  }

  onTallerValueChanged(e) {
    let taller = this.TallerSelect.find(X => X.label == e.value)

    this.markers = []
    for (let mk of this.ubicaciones.filter(X => X.clasificacion == (taller.label == "Todos" ? X.clasificacion : taller.label))) {
      var mark = <marker>{}
      mark.lat = +mk.lat
      mark.lng = +mk.lng
      mark.label = mk.label
      mark.nombre = mk.nombre
      mark.direccion = mk.direccion
      mark.logo = mk.logo
      mark.clasificacion = mk.clasificacion
      mark.idProveedorEncabezado = mk.idProveedorEncabezado,
        mark.idProveedor = mk.idProveedor

      if (mark.clasificacion == "Taller Externo" || mark.clasificacion == "Refaccionaria") {
        mark.icon = {
          url: this.URLDocs + "marker_taller.png",
          scaledSize: new google.maps.Size(35, 55)
        }
      }
      if (mark.clasificacion == "Llantera") {
        mark.icon = {
          url: this.URLDocs + "marker_llanta.png",
          scaledSize: new google.maps.Size(25, 25)
        }
      }
      if (mark.clasificacion == "Grua") {
        mark.icon = {
          url: this.URLDocs + "marker_grua.png",
          scaledSize: new google.maps.Size(25, 25)
        }
      }
      if (mark.clasificacion == "Agencia de Marca") {
        mark.icon = {
          url: this.URLDocs + "marker_agencia.png",
          scaledSize: new google.maps.Size(25, 25)
        }
      }
      if (mark.clasificacion == "Refaccionaria") {
        mark.icon = {
          url: this.URLDocs + "marker_refaccionaria.png",
          scaledSize: new google.maps.Size(25, 25)
        }
      }
      if (mark.clasificacion == "Remolques") {
        mark.icon = {
          url: this.URLDocs + "marker_remolques.png",
          scaledSize: new google.maps.Size(25, 25)
        }
      }
      this.markers.push(mark)
    }
  }

  onZonaValueChanged(e) {
    if (this.isChild)
      e.component.close();
  }

  onZonaRowClick(e) {
    this.zonaSelected = e.data.idZona;
    if (e.data.orden == e.data.maxOrden) {
      this.mapsAPILoader.load().then(() => {
        //AGREGAMOS MARCADOR CON LA IAMGEN DEL CLIENTE SELECCIONADO
        var mark = <marker>{}
        mark.lat = parseFloat(e.data.latitud);
        mark.lng = parseFloat(e.data.longitud);
        mark.label = e.data.nombre
        mark.nombre = e.data.nombre
        mark.direccion = e.data.direccion
        mark.logo = e.data.logo
        mark.clasificacion = ''
        mark.icon = {
          url: this.URLDocs + e.data.logo,
          scaledSize: new google.maps.Size(75, 75)
        }
        this.markers.push(mark)
        this.zoom = 10;
        this.latitude = parseFloat(e.data.latitud);
        this.longitude = parseFloat(e.data.longitud);
        this.isChild = true;
        //this.origen = [this.latitude, this.longitude]
      })
    }
    else {
      this.mapsAPILoader.load().then(() => {
        this.zoom = 6;
        this.latitude = 23.735948;
        this.longitude = -102.445453;
        this.isChild = false;
        //this.origen = [0, 0]
        //this.destino = [0, 0]
      })
    }
  }

  setOrigin(lat, lng, nombre){
    this.origen = [lat, lng];
    this.nombreOrigen = nombre;
    if(this.destino[0] != 0 && this.destino[1] != 0){
      this.consultarDistancia(lat, lng);
    }
  }

  setDestination(lat, lng, nombre){
    this.destino = [lat, lng];
    this.nombreDestino = nombre;
    if(this.origen[0] != 0 && this.origen[1] != 0){
      this.consultarDistancia(lat, lng);
    }
  }

  consultarDistancia(lat, lng){
    this.mapsAPILoader.load().then(() => {
      this.latitude = lat;
      this.longitude = lng;
      this.isChild = true;
      this.zoom = 18;
      //this.destino = [lat, lng]
      this.busy = this.service.get('google/distancia', {
        'latOrigen': this.origen[0],
        'lngOrigen': this.origen[1],
        'latDestino': this.destino[0],
        'lngDestino': this.destino[1]

      }).then(
        data => {
          let res: any = data
          this.distancia = res.rows[0].elements[0].distance.text
          this.tiempo = res.rows[0].elements[0].duration.text
        });

    });
  }
}



interface marker {
  lat: number;
  lng: number;
  label?: string;
  nombre: string;
  direccion: string;
  logo: string;
  icon: CustomMarkerIcon,
  clasificacion: string,
  idProveedorEncabezado: number,
  idProveedor: number
}

export interface CustomMarkerIcon {
  url: string;
  scaledSize: google.maps.Size
}