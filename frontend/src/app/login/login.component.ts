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
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: string = null;
  password: string = null;

  //Parámetros de alta
  cols: any[];
  errorMessage: string;

  busy: Promise<any>;
  msgs: Message[] = [];

  constructor(private router: Router,
    private service: BackendService,
    private auth: AuthenticationService
  ) {

  }

  ngOnInit() {

  }

  iniciar() {
    this.auth.login({
      'usuario': this.usuario,
      'password': this.password
    });
  }
}
