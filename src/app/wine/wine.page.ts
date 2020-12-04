import { Component, OnInit } from '@angular/core';

//wine model import
import { Wine } from '../app.models/Wine'


/*
* http import
*/
import '@capacitor-community/http';
import { ActivatedRoute, Router } from '@angular/router';

import { DataService } from '../services/data.service';
import { Plugins } from '@capacitor/core';

@Component({
  selector: 'app-wine',
  templateUrl: './wine.page.html',
  styleUrls: ['./wine.page.scss'],
})
export class WinePage implements OnInit {

  wine: Wine; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService) {

      this.debug();return;
      
    /**
     * get wine sent in parametters
     */
    this.wine = this.dataService.getWine();

    }

  ngOnInit() {
  }

  debug()
  {
    let postData = {
      text: "this.ocrResult"
    };

    console.log("url",this.dataService.getServerUrl());

    const { Http } = Plugins;

    const res = Http.request({
      method: 'POST',
      url: this.dataService.getServerUrl(),
      headers: {},
      data: postData
    });

    /**
     * success : create wine using data
     */
    res.then(data=>{
      console.log(data.data);

      /**
       * create wine from data we got from server
       */
      let wineData = data.data;
      let wine = new Wine(
        wineData.id,
        wineData.name,
        wineData.description,
        wineData.bottling,
        wineData.castle,
        wineData.price,
        wineData.icons
      );

      // save wine
      //this.dataService.setWine(wine);
      this.wine = wine;
    });
  }


}
