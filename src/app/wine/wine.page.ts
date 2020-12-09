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
import { WineComment } from '../app.models/WineComment';
import { User } from '../app.models/User';

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

      //this.debug();return;
      
    /**
     * get wine sent in parametters
     */
    this.wine = this.dataService.getWine();
    }

  ngOnInit() {
  }

}
