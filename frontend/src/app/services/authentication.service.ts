import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BackendService } from '../services/backend.service';



@Injectable()
export class AuthenticationService {

  busy: Promise<any>;


  constructor(
    private service: BackendService,
    private _router: Router) {
  }

  logout() {
    localStorage.removeItem("user");
    this._router.navigate(['/']);
  }

  login(value: any) {
    let parametros = JSON.parse(JSON.stringify(value));
    this.busy = this.service.get('usuario/iniciarsesion', parametros).then(
      data => {
        var authenticatedUser = data;
        if (authenticatedUser.length > 0) {
          localStorage.setItem("user", JSON.stringify(authenticatedUser[0]))
          if (authenticatedUser[0].idPerfil == 2) {
            this._router.navigate(['/cotizar', authenticatedUser[0].idProveedor]);
          }
          else
            this._router.navigate(['/clientes']);
          return true;
        }
        alert('Usuario o password incorrecto.');
        return false;
      },
      error => {
        console.log(<any>error)
      }
    );

  }

  getUser(): any {
    if (localStorage.getItem("user") != null) {
      return localStorage.getItem("user");
    }
  }

  checkCredentials(): boolean {
    if (localStorage.getItem("user") != null)
      return true;
    else
      return false;
  }

}