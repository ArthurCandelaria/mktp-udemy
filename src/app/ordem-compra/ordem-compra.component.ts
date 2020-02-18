import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css']
})
export class OrdemCompraComponent implements OnInit {

  endereco: string
  numero: number
  complemento: string
  formasPagamento = [
    { name: 'Boleto', value: 0 },
    { name: 'Cartão de Débito', value: 1 },
    { name: 'Cartão de Crédito', value: 2 }
  ]
  selectedPayment: any

  constructor() { }

  ngOnInit() {
  }

  teste() {
    alert()
    console.log('endereço: ', this.endereco)
    console.log('número: ', this.numero)
    console.log('complemento: ', this.complemento)
  }

  teste2(_event) {
    console.log(_event)
    console.log(this.selectedPayment)
  }

}
