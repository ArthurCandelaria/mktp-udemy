import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class OrdemCompraService {

  url = 'http://localhost:3000'

  constructor(private http: Http) { }

  efetivarCompra(endereco, numero, complemento, selectedPayment) {

    const body = {
      'endereco': endereco,
      'numero': numero,
      'complemento': complemento,
      'selectedPayment': selectedPayment
    }

    return this.http.post(`${this.url}/pedidos`, body)
      .map(res => res.json())

  }

  getCompraDetalhe(endpoint) {
    return this.http.get(this.url + endpoint).retry(10)
      .map(res => res.json())
  }

}
