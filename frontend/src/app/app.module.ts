import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

/*import { AppComponent } from './app.component';*/
import { PageNotFoundComponent } from './pageNotFound/page.not.found.component';
import { InitComponent } from './init.component';
import { TicketDetail } from './tickets/ticket.detail';

//input 
import { InputComponent } from './input/input.component';
import { UpdateComponent } from './update/update.component';
//pipes
import { ConversorPipe } from './pipes/conversor.pipe';

//directivas
import { HighlightDirective } from './directives/highlight.directive';
import { GigantDirective } from './directives/gigant.directive';

//service
import { TicketService } from './services/ticket.service';
import { BackendService } from './services/backend.service';
import { AuthenticationService } from './services/authentication.service';
import { GuardService } from './services/guard.service';

//ngrx
import { StoreModule } from '@ngrx/store';

//routes 
import { RouterModule, Routes } from '@angular/router';
import { APPROUTER } from './commons/router';

//firebase 
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

//PRIME NG
import { DataTableModule, DialogModule } from 'primeng/primeng';
import { MultiSelectModule } from 'primeng/primeng';
import { ButtonModule } from 'primeng/primeng';
import { TooltipModule } from 'primeng/primeng';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { GrowlModule } from 'primeng/primeng';
import { InputTextModule } from 'primeng/primeng';
import { CalendarModule } from 'primeng/primeng';
import { DropdownModule } from 'primeng/primeng';
import { PickListModule } from 'primeng/primeng';
import { FileUploadModule } from 'primeng/primeng';
import { TabViewModule } from 'primeng/primeng';
import { AccordionModule } from 'primeng/primeng';
import { TreeModule, TreeNode } from 'primeng/primeng';
import { StepsModule } from 'primeng/primeng';
import { ListboxModule } from 'primeng/primeng';
import { CheckboxModule } from 'primeng/primeng';
//import { DxDataGridModule } from 'devextreme-angular';
import { DxButtonModule, DxNumberBoxModule } from 'devextreme-angular';

import { DxDataGridModule } from 'devextreme-angular';
import {DxSelectBoxModule,
        DxCheckBoxModule,
        DxTextBoxModule,
        DxDateBoxModule,
        DxTileViewModule,
        DxDropDownBoxModule,
        DxValidatorModule,
        DxContextMenuModule,
        DxScrollViewModule,
        DxPopupModule,
        DxFormModule,
        DxListModule,
        DxFileUploaderModule,
        DxValidationSummaryModule,
        DxTreeListModule} from 'devextreme-angular';

//Angular BUSY
import { BusyModule } from 'angular2-busy';

//Angular2 Modal
import { ModalModule } from "ng2-modal";

//Google APPs Module
//import { AgmCoreModule } from "angular2-google-maps/core";
import { AgmCoreModule } from '@agm/core';

//Currency
import { CurrencyMaskModule } from "ng2-currency-mask";

import { MasterComponent } from './master/master.component';
import { LicitacionesComponent } from './licitaciones/licitaciones.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { UnidadesComponent } from './unidades/unidades.component';
import { PartidasComponent } from './partidas/partidas.component';
import { ContratosComponent } from './contratos/contratos.component';
import { NuevoContratoComponent } from './nuevocontrato/nuevocontrato.component';
import { CotizarComponent } from './cotizar/cotizar.component';
import { AprobarComponent } from './aprobar/aprobar.component';
import { PreciosComponent } from './precios/precios.component';
import { ZonasComponent } from './zonas/zonas.component';
import { NuevoProveedorComponent } from './nuevoproveedor/nuevoproveedor.component';
import { NuevaSucursalComponent } from './nuevasucursal/nuevasucursal.component';
import { MapaComponent } from './mapa/mapa.component';
import { CotizacionComponent } from './cotizacion/cotizacion.component';
import { EditarCotizacionComponent } from './editarcotizacion/editarcotizacion.component';
import { ProveedorZonaComponent } from './proveedorzona/proveedorzona.component';
import { LoginComponent } from './login/login.component';
import { LoginExternoComponent } from './login-externo/login-externo.component';
import { AltaExternaComponent } from './alta-externa/alta-externa.component';



export const firebaseConfig = {
  apiKey: "AIzaSyCBdhsSxJmTB0Zj6Br2W5laVhZPEJ25u40",
  authDomain: "angular-platzi.firebaseapp.com",
  databaseURL: "https://angular-platzi.firebaseio.com",
  storageBucket: "angular-platzi.appspot.com",
  messagingSenderId: "380289465137"
};

export const myFirebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Popup
}

@NgModule({
  declarations: [
    InputComponent,
    ConversorPipe,
    HighlightDirective,
    GigantDirective,
    PageNotFoundComponent,
    MasterComponent,
    InitComponent,
    TicketDetail,
    UpdateComponent,
    UnidadesComponent,
    ClientesComponent,
    LicitacionesComponent,
    ProveedoresComponent,
    PartidasComponent,
    ContratosComponent,
    NuevoContratoComponent,
    CotizarComponent,
    AprobarComponent,
    PreciosComponent,
    ZonasComponent,
    NuevoProveedorComponent,
    NuevaSucursalComponent,
    MapaComponent,
    CotizacionComponent,
    EditarCotizacionComponent,
    ProveedorZonaComponent,
    LoginComponent,
    LoginExternoComponent,
    AltaExternaComponent 
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(APPROUTER),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig),
    DataTableModule,
    MultiSelectModule,
    ButtonModule,
    TooltipModule,
    ConfirmDialogModule,
    DxTileViewModule,
    BrowserAnimationsModule,
    BusyModule,
    DxScrollViewModule,
    ModalModule,
    GrowlModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
    DxPopupModule,
    PickListModule,
    FileUploadModule,
    TabViewModule,
    AccordionModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyBfyiGrQRb--o2FGVJilq5UnK532uyoL2Q",
      libraries: ["places"]
    }),
    TreeModule,
    CurrencyMaskModule,
    StepsModule,
    ListboxModule,
    CheckboxModule,
    DxButtonModule,
    DxDataGridModule,
    DxSelectBoxModule,
    DxCheckBoxModule,
    DxTextBoxModule,
    DxNumberBoxModule,
    DxDateBoxModule,
    DxValidatorModule,
    DxValidationSummaryModule,
    DxContextMenuModule,
    DxFileUploaderModule,
    DxDropDownBoxModule,
    DxFormModule,
    DxListModule,
    DxTreeListModule    
  ],
  providers: [
    TicketService,
    ConfirmationService,
    BackendService,
    AuthenticationService,
    GuardService
  ],
  bootstrap: [MasterComponent]
})
export class AppModule { }
