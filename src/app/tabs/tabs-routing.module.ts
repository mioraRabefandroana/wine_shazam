import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'wine',
        children: [
          {
            path: '',
            loadChildren: '../wine/wine.module#WinePageModule'
          }
        ]
      },
      {
        path: 'comment',
        children: [
          {
            path: '',
            loadChildren: '../comment/comment.module#CommentPageModule'
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
