import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../services/ofertas.services';
import { GeoService } from './../services/geo.services';
import { ErrorService } from './../services/error.service';
// import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/finally';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../app.component.css'],
  providers: [OfertasService, GeoService, ErrorService]
})
export class HomeComponent implements OnInit {

  ofertas = []
  ofertasSearch: any
  ofertas2 = []
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
  // ofertasSearch: Observable<any>
  subjectPesquisa = new Subject()

  constructor(
    private ofertasService: OfertasService,
    private geoService: GeoService,
    private formatError: ErrorService
  ) { }

  ngOnInit() {

    this.ofertasSearch = this.subjectPesquisa
      .debounceTime(500)
      .distinctUntilChanged()
      .switchMap(() => {
        console.log('requisição http para api')
        if (this.oferta.nome.trim() == '') {
          this.ofertas2 = []
        } else {
          return this.ofertasService.searchOfertas(this.oferta.nome)
        }
      })

    this.ofertasSearch
      .subscribe(
        success => {
          this.isLoading = true
          this.ofertas2 = []
          success.forEach(element => {
            this.ofertas2.push(element)
          });
          this.isLoading = false
        }
      )

    this.getOfertasServices();
    this.getEstadosServices();
  }

  getOfertasServices() {
    this.isLoading = true
    this.ofertas = []
    setTimeout(() => {
      this.ofertasService.getOfertas(this.endpoint)
        .finally(() => this.isLoading = false)
        .subscribe(
          success => {
            this.ofertas = success
            this.ofertas = this.searchPromoName(this.ofertas)
            console.log(this.ofertas)
          },
          error => {
            this.msgError = this.formatError.formatErrorResponse(error)
            console.log('msg error: ', this.msgError)
          }
        )
    }, 1000);
  }

  pesquisa() {

    // this.ofertasService.searchOfertas(termo)
    //   .finally(() => console.log('fim da stream de eventos'))
    //   .subscribe(
    //     success => {
    //       console.log(success)
    //     },
    //     error => {
    //       this.msgError = this.formatError.formatErrorResponse(error)
    //       console.log('msg error: ', this.msgError)
    //     }
    //   )

    console.log('keyup caracter: ', this.oferta.nome)
    this.subjectPesquisa.next(this.oferta.nome)

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
      this.pesquisa()
      document.querySelector('#search').classList.remove('disabled')
      document.querySelector('#clear').classList.remove('disabled')
    }
  }

}
