import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ordem-compra-success',
  templateUrl: './ordem-compra-success.component.html',
  styleUrls: ['./ordem-compra-success.component.css']
})
export class OrdemCompraSuccessComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.pageTop()
  }

  pageTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

}
