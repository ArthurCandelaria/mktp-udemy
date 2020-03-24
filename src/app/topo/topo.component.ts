import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CarrinhoService } from 'app/services/carrinho.service';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css']
})
export class TopoComponent implements OnInit, OnChanges {

  qtdItens = 0

  constructor(
    public carrinhoService: CarrinhoService
  ) { }

  ngOnInit() {
    this.qtdItens = this.carrinhoService.exibirItens().length
    console.log('qtde de itens: ', this.carrinhoService.exibirItens().length)
  }

  ngOnChanges(changes: SimpleChanges){
    console.log('mudancas view: ', changes)
  }

}
