import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Request, RequestMethod, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { PARAMS } from './params';

@Injectable()
export class BackendService {

    urlBackEnd = PARAMS.url;

    _headers: Headers;
    requestoptions: any;

    constructor(private http: Http) {
        this._headers = new Headers();
        this._headers.append('Content-Type', 'application/json');
    }

    get(object: string, params): Promise<any[]> {
        this.requestoptions = new RequestOptions({
            method: RequestMethod.Get,
            url: this.urlBackEnd + object,
            params: params,
            headers: this._headers
        })
        return this.http.request(new Request(this.requestoptions))
            .toPromise()
            .then(this.extractData);
    }

    post(object: string, params): Promise<any[]> {
        this.requestoptions = new RequestOptions({
            method: RequestMethod.Post,
            url: this.urlBackEnd + object,
            body: params,
            headers: this._headers
        })
        return this.http.request(new Request(this.requestoptions))
            .toPromise()
            .then(this.extractData);
    }

    put(object: string, params): Promise<any[]> {
        this.requestoptions = new RequestOptions({
            method: RequestMethod.Put,
            url: this.urlBackEnd + object,
            body: params,
            headers: this._headers
        })
        return this.http.request(new Request(this.requestoptions))
            .toPromise()
            .then(this.extractData);
    }

    delete(object: string, params): Promise<any[]> {
        this.requestoptions = new RequestOptions({
            method: RequestMethod.Delete,
            url: this.urlBackEnd + object,
            body: params,
            headers: this._headers
        })
        return this.http.request(new Request(this.requestoptions))
            .toPromise()
            .then(this.extractData);
    }

    private extractData(res: Response) {
        let body = res.json();
        if (res.status == 200) {
            return body;
        }
        else {
            return {};
        }
    }

    private handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error || '';
            const err = JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return null;
    }


}