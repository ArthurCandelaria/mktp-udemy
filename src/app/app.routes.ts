import { Routes } from '@angular/router'

import { HomeComponent } from './home/home.component';
import { RestaurantesComponent } from './restaurantes/restaurantes.component';
import { DiversaoComponent } from './diversao/diversao.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { OfertaComponent } from './oferta/oferta.component';
import { OrdemCompraComponent } from './ordem-compra/ordem-compra.component';
import { Error404Component } from './error404/error404.component';

export const routs: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'restaurante', component: RestaurantesComponent },
    { path: 'diversao', component: DiversaoComponent },
    { path: 'cadastro', component: CadastroComponent },
    { path: 'oferta', component: HomeComponent },
    { path: 'oferta/:id', component: OfertaComponent },
    { path: 'compra', component: OrdemCompraComponent },
    { path: '**', component: Error404Component }
]