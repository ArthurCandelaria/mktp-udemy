import { Component, OnInit } from '@angular/core'
import { OrdemCompraService } from '../services/ordem-compra.service'
import { ErrorService } from 'app/services/error.service'
import $ from 'jquery';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [OrdemCompraService, ErrorService]
})
export class OrdemCompraComponent implements OnInit {

  idPedido: any
  endereco = ''
  isEndereco = true
  numero = ''
  isNumero = true
  complemento = ''
  formasPagamento = [
    { name: 'Boleto', value: 0 },
    { name: 'Cartão de Débito', value: 1 },
    { name: 'Cartão de Crédito', value: 2 }
  ]
  selectedPayment = { name: '', value: 0 }
  isPagamento = true
  alertSuccess: boolean
  alertWarning: boolean
  alertDanger: boolean
  msgAlert: string

  constructor(
    private ordemCompraService: OrdemCompraService,
    private formatError: ErrorService
  ) { }

  ngOnInit() {
  }

  setPayment(_value) {
    this.formasPagamento.forEach(element => {
      if (element.value == _value) {
        this.selectedPayment = { name: element.name, value: element.value }
      }
    });
  }

  submit() {
    this.closeAlert()
    if (this.validateInput()) {
      this.ordemCompraService.efetivarCompra(this.endereco, this.numero, this.complemento, this.selectedPayment).subscribe(
        success => {
          this.idPedido = success.id
          this.alertSuccess = true
          $("#confirmPayment").attr("disabled", true);
        },
        error => {
          this.alertDanger = true
          this.msgAlert = this.formatError.formatErrorResponse(error)
          console.log('msg error: ', this.msgAlert)
        }
      )
    } else {
      this.alertWarning = true
      this.msgAlert = '<strong>Ops!</strong> Identificamos um erro de preenchimento de dados. Por favor, revise os campos para tentar novamente.'
    }
  }

  validateInput() {
    this.isEndereco = false
    this.isNumero = false
    this.isPagamento = false
    let validate = true

    if (this.endereco.length > 3) {
      this.isEndereco = true
    } else {
      validate = false
    }

    if (this.numero) {
      this.isNumero = true
    } else {
      validate = false
    }

    if (this.selectedPayment.name) {
      this.isPagamento = true
    } else {
      validate = false
    }

    return validate

  }

  closeAlert() {
    this.alertSuccess = false
    this.alertWarning = false
    this.alertDanger = false
    this.msgAlert = ''
  }

}
