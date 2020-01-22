import { Http } from '@angular/http'
import { Injectable } from '@angular/core'

@Injectable()

export class GeoService {

    constructor(private http: Http) {

    }

    getEstados() {
        return this.http.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
            .map(res => res.json());
    }

    getMunicipios(idEstado) {
        return this.http.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados/' + idEstado + '/municipios')
            .map(res => res.json());
    }

}