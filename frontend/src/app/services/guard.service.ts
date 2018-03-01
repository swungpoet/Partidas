import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class GuardService implements CanActivate {
    constructor(private router: Router) { }
    canActivate() {
        if (localStorage.getItem("user") === null) {
            this.router.navigate(['/']);
            return false;
         } 
        // else {
        //     var user = JSON.parse(localStorage.getItem("user"));
        //     if (user.idPerfil == "2")
        //         this.router.navigate(['/cotizar', user.idProveedor]);
        // }
        return true;
    }
}