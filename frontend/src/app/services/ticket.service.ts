import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';



@Injectable()
export class TicketService{

    miVariableTicketGlobal = "soy una variable global";

    urlBackEnd = "http://localhost:3000/";

    constructor(private http: Http){}


   getTicketsMongo (): Promise<any[]> {
    return this.http.get(this.urlBackEnd + 'tickets')
                    .toPromise()
                    .then(this.extractData)
                    .catch(this.handleError);
  }

  getTicketMongo(id:number):Promise<any[]>{
      return this.http.post(this.urlBackEnd+'ticket', {'id' : id})
                .toPromise()
                .then(this.extractData)
                .catch(this.handleError);
  }

  updateTicketMongo(id:number, titulo:string, estado:string):Promise<any[]>{
      return this.http.post(this.urlBackEnd+'ticketUpdate',
                 {
                     'id' : id,
                     'titulo': titulo,
                     'estado': estado
                })
                .toPromise()
                .then(this.extractData)
                .catch(this.handleError);
  }

  removeTicketMongo(id:number):Promise<any[]>{
      return this.http.post(this.urlBackEnd+'ticketDelete',
                 {
                     'id' : id
                })
                .toPromise()
                .then(this.extractData)
                .catch(this.handleError);
  }

    private extractData(res: Response) {
        let body = res.json();
        console.log("body", body);
        if (body.status == 200){
            return body.result;
        }
        else{
            return { };
        }
    }
    private handleError(error: Response | any){
        let errMsg:string;
        if(error instanceof Response){
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        }
        else{
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }


    getVariableGlobal():string{
        return this.miVariableTicketGlobal;
    }


}