import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommentPage } from './comment.page';

const routes: Routes = [
  {
    path: '',
    component: CommentPage
  },
  {
    path: 'comment-form',
    loadChildren: () => import('./comment-form/comment-form.module').then( m => m.CommentFormPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommentPageRoutingModule {}
