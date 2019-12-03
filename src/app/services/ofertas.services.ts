import { Http } from '@angular/http'
import { Injectable } from '@angular/core'
import 'rxjs/add/operator/map';

@Injectable()

export class OfertasService {

    constructor(private http: Http) {

    }

    getOfertas(endpoint) {
        return this.http.get('http://localhost:3000/ofertas' + endpoint)
            .map(res => res.json());
    }

}