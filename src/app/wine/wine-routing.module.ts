import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WinePage } from './wine.page';

const routes: Routes = [
  {
    path: '',
    component: WinePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WinePageRoutingModule {}
