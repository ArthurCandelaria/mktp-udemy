import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ComoUsarService {

  url = 'http://localhost:3000/como-usar'

  constructor(
    private http: Http
  ) { }

  getComoUsar(endpoint) {
    return this.http.get(`${this.url}/${endpoint}`)
    .map(res => res.json())
  }

}