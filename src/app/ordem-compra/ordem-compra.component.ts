import { Component, OnInit } from '@angular/core'
import { OrdemCompraService } from '../services/ordem-compra.service'
import { ErrorService } from 'app/services/error.service'
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [OrdemCompraService, ErrorService]
})
export class OrdemCompraComponent implements OnInit {

  formulario: FormGroup = new FormGroup({
    'endereco': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(120)]),
    'numero': new FormControl(null, [Validators.required, Validators.min(1), Validators.maxLength(6)]),
    'complemento': new FormControl(null, []),
    'formaPagamento': new FormControl(Validators.required)
  })
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
  isLoading: boolean

  constructor(
    private ordemCompraService: OrdemCompraService,
    private formatError: ErrorService
  ) { }

  ngOnInit() {
  }

  confirmarCompra() {

    this.resetAlerts()

    if (this.formulario.status == 'INVALID') {

      console.log('forumario invalido!')

      this.alertWarning = true
      this.msgAlert = '<strong>Ops!</strong><br />Verifique se todos os campos foram preenchidos corretamente.'

      this.formulario.get('endereco').markAsTouched()
      this.formulario.get('numero').markAsTouched()
      this.formulario.get('complemento').markAsTouched()
      this.formulario.get('formaPagamento').markAsTouched()
    } else {

      this.isLoading = true
      console.log('formulario valido')

      this.ordemCompraService.efetivarCompra(
        this.formulario.value.endereco,
        this.formulario.value.numero,
        this.formulario.value.complemento,
        this.formulario.value.formaPagamento)
        .finally(() => this.isLoading = false)
        .subscribe(
          success => {
            console.log(success)
            this.idPedido = success.id
            this.alertSuccess = true
          },
          error => {
            console.log(error)
            this.alertWarning = true
            this.msgAlert = this.formatError.formatErrorResponse(error)
          }
        )
    }

  }

  resetAlerts() {
    this.alertSuccess = false
    this.alertWarning = false
    this.alertDanger = false
    this.msgAlert = ''
  }

}
