import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../services/ofertas.services';
import { GeoService } from './../services/geo.services';
import { ErrorService } from './../services/error.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../app.component.css'],
  providers: [OfertasService, GeoService, ErrorService]
})
export class HomeComponent implements OnInit {

  ofertas = []
  estados = []
  municipios = []
  idEstado: any
  idMunicipio: any
  estadoSelect: any
  municipioSelect: any
  visible = false
  endpoint = ''
  isLoading: boolean
  destaque = false
  oferta = {
    nome: ''
  }
  msgError: string

  constructor(
    private ofertasService: OfertasService,
    private geoService: GeoService,
    private formatError: ErrorService
  ) { }

  ngOnInit() {
    this.getOfertasServices();
    this.getEstadosServices();
  }

  getOfertasServices() {
    this.isLoading = true
    this.ofertas = []
    setTimeout(() => {
      this.ofertasService.getOfertas(this.endpoint).subscribe(
        success => {
          this.ofertas = success
          this.ofertas = this.searchPromoName(this.ofertas)
          console.log(this.ofertas)
          this.isLoading = false
        },
        error => {
          this.msgError = this.formatError.formatErrorResponse(error)
          console.log(this.msgError)
          this.isLoading = false
        }
      )
    }, 1000);
  }

  destaquesFilter() {
    this.destaque = !this.destaque
    if (this.destaque) {
      this.endpoint = '?destaque=true'
    } else {
      this.endpoint = ''
    }
    this.getOfertasServices()
  }

  getEstadosServices() {
    this.geoService.getEstados().subscribe(
      success => {
        this.estados = success
        console.log(this.estados)
      }
    )
  }

  estadoSelected(event) {
    this.idEstado = event.target.value;
    this.estadoSelect = this.estados.filter((line) => {
      return line.id == this.idEstado
    })
    console.log(this.estadoSelect)
    this.getMunicipioServices()
  }

  getMunicipioServices() {
    this.visible = true
    this.geoService.getMunicipios(this.idEstado).subscribe(
      success => {
        this.municipios = success
        console.log(this.municipios)
      }
    )
  }

  municipioSelected(event) {
    this.idMunicipio = event.target.value;
    this.municipioSelect = this.municipios.filter((line) => {
      return line.id == this.idMunicipio
    })
    console.log(this.municipioSelect)
  }

  searchPromoName(_success) {
    if (this.oferta.nome.length > 0) {
      let promoName = this.oferta.nome.toUpperCase()
      // console.log('promoName ', promoName)
      let data = _success.filter(x => x.titulo.toUpperCase().indexOf(promoName) > -1)
      // console.log(data)
      return data
    } else {
      return _success
    }
  }

  clearPromoName() {
    this.oferta.nome = ''
    document.querySelector('#search').classList.add('disabled')
    document.querySelector('#clear').classList.add('disabled')
    this.getOfertasServices()
  }

  lengthPromoName() {
    if (this.oferta.nome.length <= 0) {
      document.querySelector('#search').classList.add('disabled')
      document.querySelector('#clear').classList.add('disabled')
    } else {
      document.querySelector('#search').classList.remove('disabled')
      document.querySelector('#clear').classList.remove('disabled')
    }
  }

}
