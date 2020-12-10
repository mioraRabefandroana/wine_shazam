import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommentFormPage } from './comment-form.page';

const routes: Routes = [
  {
    path: '',
    component: CommentFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommentFormPageRoutingModule {}
