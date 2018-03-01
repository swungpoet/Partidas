import { Router, ActivatedRoute, Params } from '@angular/router';

import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { SelectItem } from 'primeng/primeng';

import { BackendService } from '../services/backend.service';
import { AuthenticationService } from '../services/authentication.service';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';

//Gestión de Formas
import { FormControl } from "@angular/forms";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { ModalModule } from "ng2-modal";
import { Message } from 'primeng/primeng';

@Component({
  selector: 'app-login',
  templateUrl: './login-externo.component.html',
  styleUrls: ['./login-externo.component.css']
})
export class LoginExternoComponent implements OnInit {

  usuario: string = null;
  password: string = null;

  //Parámetros de alta
  cols: any[];
  errorMessage: string;

  busy: Promise<any>;
  msgs: Message[] = [];

  constructor(private router: Router,
    private service: BackendService
  ) {

  }

  ngOnInit() {

  }

  iniciar() {


    this.busy = this.service.get('usuario/iniciarsesionASE', {
      'usuario': this.usuario,
      'password': this.password
    }).then(
      data => {
        var authenticatedUser = data;
        if (authenticatedUser.length > 0) {
          localStorage.setItem("userASE", JSON.stringify(authenticatedUser[0]))
          this.router.navigate(['/alta']);
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


}
