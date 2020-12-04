import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.page.html',
  styleUrls: ['./configuration.page.scss'],
})
export class ConfigurationPage implements OnInit {

  serverUrl: string;
  constructor( 
    private dataService: DataService,
    private modalCtrl: ModalController) 
  { 
    this.serverUrl = dataService.getServerUrl();
  }

  ngOnInit() {
  }

  /**
   * set server configuration
   */
  setConfig()
  {
    this.dataService.setServerConfig({
      serverUrl: this.serverUrl
    })

    this.modalCtrl.dismiss({
      "dismissed": true
    })
  }

}
