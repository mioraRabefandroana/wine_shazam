import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WinePageRoutingModule } from './wine-routing.module';

import { WinePage } from './wine.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WinePageRoutingModule
  ],
  declarations: [WinePage]
})
export class WinePageModule {}
