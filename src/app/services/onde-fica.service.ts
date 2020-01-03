import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class OndeFicaService {

  url = 'http://localhost:3000/onde-fica'

  constructor(
    private http: Http
  ) { }

  getOndeFica(endpoint) {
    return this.http.get(`${this.url}/${endpoint}`)
    .map(res => res.json())
  }

}
