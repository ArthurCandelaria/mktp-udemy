import { ActivatedRoute } from '@angular/router';
import { OndeFicaService } from './../../services/onde-fica.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-onde-fica',
  templateUrl: './onde-fica.component.html',
  styleUrls: ['./onde-fica.component.css'],
  providers: [OndeFicaService]
})
export class OndeFicaComponent implements OnInit {

  ondeFica: string;
  endpoint: string;

  constructor(
    private route: ActivatedRoute,
    private ondeFicaService: OndeFicaService
  ) { }

  ngOnInit() {
    this.getOndeFica()
  }

  getOndeFica() {
    this.ondeFicaService.getOndeFica(this.getRoute()).subscribe(
      success => {
        this.ondeFica = success[0].descricao
      }
    )
  }

  getRoute() {
    return '?id=' + this.route.snapshot.params['id']
  }

}
