import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommentFormPageRoutingModule } from './comment-form-routing.module';

import { CommentFormPage } from './comment-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommentFormPageRoutingModule
  ],
  declarations: [CommentFormPage]
})
export class CommentFormPageModule {}
