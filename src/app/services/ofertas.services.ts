import { Http } from '@angular/http'
import { Injectable } from '@angular/core'
// import { ActivatedRoute } from '@angular/router'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/retry'
// import { Observable } from 'rxjs/Observable'

@Injectable()

export class OfertasService {

    url = 'http://localhost:3000/ofertas'

    constructor(
        // private route: ActivatedRoute,
        private http: Http
    ) { }

    getOfertas(endpoint) {
        return this.http.get(this.url + endpoint).retry(10)
            .map(res => res.json());
    }

    searchOfertas(termo) {
        return this.http.get(this.url + '?descricao_oferta_like=' + termo)
            .map(res => res.json())
    }

}