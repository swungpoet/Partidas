import { Component, OnInit } from '@angular/core';

import { InitComponent } from '../init.component';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';




@Component({
  selector: 'master-component',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit {

  user: any = {};
  ruta: string;


  constructor(public router: Router,
    public auth: AuthenticationService) {
    this.ruta = location.pathname;
  }

  ngOnInit() {

    if (this.auth.checkCredentials()) {
      this.user = JSON.parse(this.auth.getUser());
      if (this.user.idPerfil == 2)
        this.router.navigate(['/cotizar', this.user.idProveedor]);
    }
  }

  CerrarSesion() {
    this.auth.logout();
  }

}
