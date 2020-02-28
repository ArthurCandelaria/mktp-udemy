import { Injectable } from '@angular/core';

@Injectable()
export class OrdemCompraService {

  constructor() { }

  efetivarCompra(endereco, numero, complemento, selectedPayment) {
    console.log('endereço: ', endereco)
    console.log('número: ', numero)
    console.log('complemento: ', complemento)
    console.log('forma de pagamento: ', selectedPayment.name)
  }

}
