import { Component, OnInit } from '@angular/core';
import { OfertasService } from './../services/ofertas.services';

@Component({
  selector: 'app-diversao',
  templateUrl: './diversao.component.html',
  styleUrls: ['./diversao.component.css', '../app.component.css'],
  providers: [OfertasService]
})
export class DiversaoComponent implements OnInit {

  isLoading: boolean
  ofertas = []
  endpoint: string

  constructor(
    private ofertasService: OfertasService
  ) { }

  ngOnInit() {
    this.getOfertasServices()
  }

  getOfertasServices() {
    this.isLoading = true
    this.endpoint = this.ofertasService.getUrl()
    setTimeout(() => {
      this.ofertasService.getOfertas(this.endpoint).subscribe(
        success => {
          this.ofertas = success
          this.isLoading = false
        }
      )
    }, 1000);
  }

}
