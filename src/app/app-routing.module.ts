import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/lista/lista.module').then(m => m.ListaPageModule)
  },
  {
    path: 'edicao',
    loadChildren: () => import('./pages/edicao/edicao.module').then( m => m.EdicaoPageModule)
  },
  {
    path: 'delete',
    loadChildren: () => import('./pages/delete/delete.module').then( m => m.DeletePageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
