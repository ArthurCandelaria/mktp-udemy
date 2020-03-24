import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { OfertasService } from 'app/services/ofertas.services';
import { ErrorService } from 'app/services/error.service';
import { OrdemCompraService } from 'app/services/ordem-compra.service';
// import { CarrinhoService } from 'app/services/carrinho.service';

@Component({
  selector: 'app-ordem-compra-success',
  templateUrl: './ordem-compra-success.component.html',
  styleUrls: ['./ordem-compra-success.component.css'],
  providers: [OrdemCompraService, ErrorService]
})
export class OrdemCompraSuccessComponent implements OnInit {

  isLoading: boolean
  id: number
  compra: Array<any>
  endpoint = '/pedidos?id='
  msgError = ''

  constructor(
    private router: ActivatedRoute,
    private ordemCompraService: OrdemCompraService,
    // private carrinhoService: CarrinhoService,
    private formatError: ErrorService
  ) { }

  ngOnInit() {
    this.startPage()
    this.getCompra()
  }

  startPage() {
    this.id = this.router.snapshot.params['id']
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  getCompra() {
    this.isLoading = true
    this.compra = []
    this.ordemCompraService.getCompraDetalhe(this.endpoint + this.id)
      .finally(() => this.isLoading = false)
      .subscribe(
        success => {
          this.compra = success
          console.log(this.compra)
        },
        error => {
          this.msgError = this.formatError.formatErrorResponse(error)
          console.log('msg error: ', this.msgError)
        }
      )
  }

}
