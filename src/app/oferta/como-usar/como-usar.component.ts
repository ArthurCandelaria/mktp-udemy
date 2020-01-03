import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ComoUsarService } from './../../services/como-usar.service';

@Component({
  selector: 'app-como-usar',
  templateUrl: './como-usar.component.html',
  styleUrls: ['./como-usar.component.css'],
  providers: [ComoUsarService]
})
export class ComoUsarComponent implements OnInit {

  comoUsar = <any>[];
  endpoint: string;

  constructor(
    private route: ActivatedRoute,
    private comoUsarService: ComoUsarService
  ) { }

  ngOnInit() {
    this.getComoUsar()
  }

  getComoUsar() {
    this.comoUsarService.getComoUsar(this.getRoute()).subscribe(
      success => {
        this.comoUsar = success[0]
      }
    )
  }

  getRoute() {
    return '?id=' + this.route.snapshot.params['id']
  }

}
