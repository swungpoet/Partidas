import { Routes } from '@angular/router';

import { ClientesComponent } from '../clientes/clientes.component';
import { LicitacionesComponent } from '../licitaciones/licitaciones.component';
import { ProveedoresComponent } from '../proveedores/proveedores.component';
import { UnidadesComponent } from '../unidades/unidades.component';
import { PartidasComponent } from '../partidas/partidas.component';
import { ContratosComponent } from '../contratos/contratos.component';
import { NuevoContratoComponent } from '../nuevocontrato/nuevocontrato.component';
import { CotizarComponent } from '../cotizar/cotizar.component';
import { AprobarComponent } from '../aprobar/aprobar.component';
import { PreciosComponent } from '../precios/precios.component';
import { ZonasComponent } from '../zonas/zonas.component';
import { NuevoProveedorComponent } from '../nuevoproveedor/nuevoproveedor.component';
import { MapaComponent } from '../mapa/mapa.component';
import { CotizacionComponent } from '../cotizacion/cotizacion.component';
import { EditarCotizacionComponent } from '../editarcotizacion/editarcotizacion.component';
import { ProveedorZonaComponent } from '../proveedorzona/proveedorzona.component';
import { LoginComponent } from '../login/login.component';
import { LoginExternoComponent } from '../login-externo/login-externo.component';
import { AltaExternaComponent } from '../alta-externa/alta-externa.component';
import { NuevaSucursalComponent } from '../nuevasucursal/nuevasucursal.component';

import { PageNotFoundComponent } from '../pageNotFound/page.not.found.component';
import { TicketDetail } from '../tickets/ticket.detail';
import { UpdateComponent } from '../update/update.component';

import { GuardService } from '../services/guard.service'

export const APPROUTER: Routes = [
    { path: '', component: LoginComponent },
    // { path: 'login', component: LoginExternoComponent },
    { path: 'alta', component: AltaExternaComponent },
    { path: 'clientes', component: ClientesComponent, canActivate: [GuardService] },
    { path: 'zonas', component: ZonasComponent, canActivate: [GuardService] },
    { path: 'mapa', component: MapaComponent, canActivate: [GuardService] },
    { path: 'licitaciones', component: LicitacionesComponent, canActivate: [GuardService] },
    { path: 'nuevoproveedor', component: NuevoProveedorComponent, canActivate: [GuardService] },
    { path: 'nuevoproveedor/:id', component: NuevoProveedorComponent, canActivate: [GuardService] },
    { path: 'proveedores', component: ProveedoresComponent, canActivate: [GuardService] },
    { path: 'proveedorzona/:id', component: ProveedorZonaComponent, canActivate: [GuardService] },
    { path: 'unidades', component: UnidadesComponent, canActivate: [GuardService] },
    { path: 'partidas', component: PartidasComponent, canActivate: [GuardService] },
    { path: 'contratos', component: ContratosComponent, canActivate: [GuardService] },
    { path: 'nuevocontrato', component: NuevoContratoComponent, canActivate: [GuardService] },
    { path: 'nuevocontrato/:id', component: NuevoContratoComponent, canActivate: [GuardService] },
    { path: 'cotizar/:id', component: CotizarComponent, canActivate: [GuardService] },
    { path: 'cotizar', component: CotizarComponent, canActivate: [GuardService] },
    { path: 'editarcotizacion/:id', component: EditarCotizacionComponent, canActivate: [GuardService] },
    { path: 'cotizacion', component: CotizacionComponent, canActivate: [GuardService] },
    { path: 'aprobar/:id', component: AprobarComponent, canActivate: [GuardService] },
    { path: 'precios/:id', component: PreciosComponent, canActivate: [GuardService] },
    { path: 'ticket/:id', component: TicketDetail, canActivate: [GuardService] },
    { path: 'ticketUpdate/:id', component: UpdateComponent, canActivate: [GuardService] },
    { path: 'nuevasucursal', component: NuevaSucursalComponent, canActivate: [GuardService] },
    { path: 'nuevasucursal/:idProv/:idSuc', component: NuevaSucursalComponent, canActivate: [GuardService] },
    { path: 'nuevasucursal/:idProv', component: NuevaSucursalComponent, canActivate: [GuardService] }
]