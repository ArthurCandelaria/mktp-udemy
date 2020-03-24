import { Component, OnInit, OnDestroy } from '@angular/core';
import { OfertasService } from './../services/ofertas.services';
import { ActivatedRoute } from '@angular/router';
import { TopoComponent } from '../topo/topo.component';
import { ErrorService } from './../services/error.service';
import { CarrinhoService } from 'app/services/carrinho.service';
// import { Observable } from 'rxjs/Observable';
// import { Observer } from 'rxjs/Observer';
// import { Subscription } from 'rxjs/Subscription';
// import 'rxjs/Rx';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css', '../app.component.css'],
  providers: [OfertasService, TopoComponent, ErrorService]
})

export class OfertaComponent implements OnInit, OnDestroy {

  isLoading: boolean
  oferta: any
  imgs = []
  endpoint: string
  selectedPhoto: any
  msgError: string

  // meuObservableTesteSubscription: Subscription
  // tempoObservableSubscription: Subscription

  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService,
    private formatError: ErrorService,
    public topoComponent: TopoComponent,
    public carrinhoService: CarrinhoService
  ) { }

  ngOnInit() {
    this.topo()
    this.getOfertasService()

    // let tempoObservable = Observable.interval(1000)

    // this.tempoObservableSubscription = tempoObservable.subscribe((intervalo: number) => {
    //   console.log(intervalo)
    // })

    // // Observado
    // let meuObservableTeste = Observable.create(
    //   observer => {
    //     observer.next('Primeiro evento da stream.')
    //     observer.complete();
    //     observer.next(3)

    //   })

    // // Observador
    // this.meuObservableTesteSubscription = meuObservableTeste.subscribe(
    //   resultado => {
    //     console.log(resultado)
    //   },
    //   error => {
    //     console.log(error)
    //   },
    //   success => {
    //     console.log('Stream de eventos finalizada.')
    //   })

  }

  ngOnDestroy() {
    // this.meuObservableTesteSubscription.unsubscribe()
    // this.tempoObservableSubscription.unsubscribe()
  }

  topo() {
    window.scrollTo(0, 0)
  }

  getOfertasService() {
    this.isLoading = true
    this.endpoint = '/?id=' + this.route.snapshot.params['id']
    // this.endpoint = '/?id=' + this.route.snapshot.paramMap.get('id')
    setTimeout(() => {
      this.ofertasService.getOfertas(this.endpoint).subscribe(
        success => {
          this.oferta = success[0]
          this.imgs = this.oferta.imagens
          this.selectedPhoto = this.imgs[0].url
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

  selectPhoto(event) {
    let srcImage = event.target.src
    const imgView = document.querySelector('#imgView')
    console.log(imgView)
    console.log(srcImage);
    imgView.setAttribute('src', srcImage)
  }

  addItenCarrinho() {
    this.carrinhoService.incluirOferta(this.oferta)
  }

}