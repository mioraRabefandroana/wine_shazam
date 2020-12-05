import { Injectable } from '@angular/core';
import { Wine } from 'src/app/app.models/Wine';

/**
 * http import
 */
import '@capacitor-community/http';
import { HTTP } from '@ionic-native/http/ngx';
import { Plugins } from '@capacitor/core';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private wine: Wine; //wine
  private httpServerConfig;
 
  constructor(private http: HTTP) { 
    this.httpServerConfig = {
      //serverUrl: "http://wine_shazam/",
      //serverUrl: "http://192.168.43.181/wine_shazam.test/test.php",
      serverUrl: "http://192.168.43.181/wine_shazam/public/",
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

  /**
   * get server address
   */
  getServerUrl():string{
    return this.httpServerConfig.serverUrl;
  }

  /**
   * get server image directory storage
   */
  getServerImageDir():string{
    return this.getServerUrl() + "images/";
  }
  /**
   * post data to server
   * @param params 
   * @param method 
   */
  async post(params,method=0)
  {
    if(method == 0)
    {
      console.log("----- post method 0 : capacitor community -----");
      const { Http } = Plugins;

      return Http.request({
        method: 'POST',
        url: params.url,
        headers: params.headers || {},
        data: params.data || {}
      })      
    }
    else
    {
      console.log("----- post method 1 : cordova plugin-----");
      //## TODO
      return this.http.get(params.url,{},{});
    }
 }


}
