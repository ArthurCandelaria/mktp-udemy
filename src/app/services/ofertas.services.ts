import { Http } from '@angular/http'
import { Injectable } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import 'rxjs/add/operator/map';

@Injectable()

export class OfertasService {

    url = 'http://localhost:3000/ofertas'

    constructor(
        private route: ActivatedRoute,
        private http: Http
    ) { }

    getUrl() {
        const url = window.location.href
        switch (url.substring(url.lastIndexOf('/') + 1)) {
            case 'restaurantes':
                return '?categoria=restaurante'
            case 'diversao':
                return '?categoria=diversao'
            default:
                return ''
        }
    }

    getOfertas(endpoint) {
        return this.http.get(this.url + endpoint)
            .map(res => res.json());
    }

}