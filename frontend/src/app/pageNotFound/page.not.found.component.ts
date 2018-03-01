import {Component } from '@angular/core';

@Component({
    selector :'page-not-found',
    template: `
        <div id="page-title">
            <h1 class="page-header text-overflow">Sitio NO Encontrado</h1>
        </div>
        <div id="page-content">
        <p>
             <a routerLink="/">Volver a Inicio</a>
        </p>
        </div>
       
    `
})
export class PageNotFoundComponent{
    
}