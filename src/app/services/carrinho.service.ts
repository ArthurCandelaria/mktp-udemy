import { Injectable } from '@angular/core';

@Injectable()
export class CarrinhoService {

  constructor() { }

  itens = []

  incluirOferta(oferta) {
    this.itens.push(oferta)
  }

  exibirItens() {
    return this.itens
  }

}
