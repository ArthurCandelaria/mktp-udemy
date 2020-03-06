import { Component, OnInit } from '@angular/core'
import { OrdemCompraService } from '../services/ordem-compra.service'
import { ErrorService } from 'app/services/error.service'

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [OrdemCompraService, ErrorService]
})
export class OrdemCompraComponent implements OnInit {

  idPedido: number
  formasPagamento = [
    { name: 'Boleto' },
    { name: 'Cartão de Débito' },
    { name: 'Cartão de Crédito' }
  ]
  selectedPayment = { name: '', value: 0 }
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

  submitCompra(formulario) {
    this.closeAlert()
    if (this.checkInputs(formulario)) {
      this.ordemCompraService.efetivarCompra(
        formulario.value.endereco,
        formulario.value.numero,
        formulario.value.complemento,
        formulario.value.formaPagamento)
        .subscribe(
          success => {
            this.idPedido = success.id
            this.alertSuccess = true
          },
          error => {
            this.alertDanger = true
            this.msgAlert = this.formatError.formatErrorResponse(error)
          }
        )
    } else {
      this.alertWarning = true
      this.msgAlert = '<strong>Ops!</strong> Identificamos um erro de preenchimento de dados. Por favor, revise os campos para tentar novamente.'
    }
  }

  checkInputs(formulario) {
    let send = true
    if (formulario.value.endereco.length == 0 || formulario.value.numero == 0 || formulario.value.formaPagamento == 0) {
      send = false
    }
    return send
  }

  closeAlert() {
    this.alertSuccess = false
    this.alertWarning = false
    this.alertDanger = false
    this.msgAlert = ''
  }

}
