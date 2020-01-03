import { Component, OnInit } from '@angular/core';
import { OfertasService } from './../services/ofertas.services';

@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.css', '../app.component.css'],
  providers: [OfertasService]
})
export class RestaurantesComponent implements OnInit {

  isLoading: boolean
  ofertas = []
  endpoint: string

  constructor(
    private ofertasService: OfertasService,
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
