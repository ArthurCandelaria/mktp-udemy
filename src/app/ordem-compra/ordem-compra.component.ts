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

  constructor(
    private ordemCompraService: OrdemCompraService,
    private formatError: ErrorService
  ) { }

  ngOnInit() {
  }

  confirmarCompra() {
    console.log(this.formulario)
  }

}
