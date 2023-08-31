import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EdicaoPage } from './edicao.page';

const routes: Routes = [
  {
    path: '',
    component: EdicaoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EdicaoPageRoutingModule {}
