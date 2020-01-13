import { Component, OnInit } from '@angular/core';
import { OfertasService } from './../services/ofertas.services';
import { ActivatedRoute } from '@angular/router';
import { TopoComponent } from '../topo/topo.component'

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css', '../app.component.css'],
  providers: [OfertasService, TopoComponent]
})

export class OfertaComponent implements OnInit {

  isLoading: boolean
  oferta: any
  imgs = []
  endpoint: string
  selectedPhoto: any

  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService,
    public topoComponent: TopoComponent
  ) { }

  ngOnInit() {
    this.topo()
    this.getOfertasService()
  }

  topo() {
    window.scrollTo(0, 0)
  }

  getOfertasService() {
    this.isLoading = true
    this.endpoint = '/?id=' + this.route.snapshot.paramMap.get('id')
    setTimeout(() => {
      this.ofertasService.getOfertas(this.endpoint).subscribe(
        success => {
          this.oferta = success[0]
          this.imgs = this.oferta.imagens
          this.selectedPhoto = this.imgs[0].url
          this.isLoading = false
        }
      )
    }, 1000);
  }

  selectPhoto(event) {
    let srcImage = event.target.src
    const imgView = document.querySelector('#imgView')
    console.log(imgView)
    console.log(srcImage);
    imgView.setAttribute('src', srcImage)
  }

  implementCarrinho(event) {
    this.topoComponent.carrinho.push(event)
    console.log(this.topoComponent.carrinho)
  }

}
