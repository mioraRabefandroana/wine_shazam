import { Injectable } from '@angular/core';
import { Wine } from 'src/app/app.models/Wine';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private wine: Wine; //wine
  private httpServerConfig;
 
  constructor() { 


    this.httpServerConfig = {
      serverUrl: "http://wine_shazam/",
    }
  }
 
  /**
   * get wine
   * @param wine 
   */
  setWine(wine: Wine) {
    this.wine = wine;
  }
  /**
   * set wine
   */
  getWine(): Wine {
    return this.wine;
  }

  /**
   * set server configuration
   */
  setServerConfig(serverConfig){
    this.httpServerConfig.serverUrl = serverConfig.serverUrl
  }

  getServerUrl():string{
    return this.httpServerConfig.serverUrl;
  }

}
