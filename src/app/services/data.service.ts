import { Injectable } from '@angular/core';
import { Wine } from 'src/app/app.models/Wine';

/**
 * http import
 */
import '@capacitor-community/http';
import { HTTP } from '@ionic-native/http/ngx';
import { Plugins } from '@capacitor/core';

import {Md5} from 'ts-md5/dist/md5';
import { User } from '../app.models/User';
import { ModalController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private wine: Wine; //wine

  // authentified user
  private user: User = null; 
  
  private httpServerConfig;

  private debugStr: string;
 
  constructor(
    private http: HTTP,
    public modalController: ModalController
  ) { 
    this.httpServerConfig = {
      //serverUrl: "http://wine_shazam/",
      // serverUrl: "http://192.168.43.181/wine_shazam.test/test.php/",
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
   * get authetified user
   */ 
  getUser() : User {
    return  this.user;
  }

  /**
   * set authentified user
   */
  setUser(user: User)
  {
    this.user = user;
  }

  /**
   * clear authentified user : log out
   */
  clearUser()
  {
    this.user = null;
  }
  
  /**
   * return connected user
   */
  userConnected()
  {
    return this.user;
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
  async sendServerRequest(params)
  {
    console.log("----- post method 0 : capacitor community -----");
    this.log("----- post method 0 : capacitor community -----");
    const { Http } = Plugins;
    console.log("<<params>>",params)
    this.log("<<params>>");
    this.log(params);
    // set data to be sent by get method
    let url = params.url;
    if(params.data &&
      params.data.value &&
      params.data.key)
    {
      //clean data
      let value = this.cleanString( params.data.value.toString() );
      url = url+"?"+params.data.key+"="+value;

      console.log("<<url>>",url);
      this.log("<<url>>");
      this.log(url);
    }
      
    // send http request
    return await Http.request({
      method: 'GET',
      url: url,
      headers: params.headers || {},
      data: {}
    })
  }

 /**
  * clean string: remove special char [unless blank]
  */
 cleanString(str: string)
 {
   return str.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').trim();
 }

 /**
  * get "more comment" url request 
  * @param wineId 
  * @param lastCommentId 
  */
 getMoreCommentUrl(wineId, lastCommentId)
 {
   return this.getServerUrl()+"comment/more/"+wineId+"/under/"+lastCommentId;
 }

 /**
  * set and return new comment url
  * @param wineId 
  * @param userId 
  * @param comment 
  */
  getSubmitCommentUrl(wineId, userId, comment)
  {
    return this.getServerUrl()+"comment/add/wine/"+wineId+"/user/"+userId+"/comment/"+comment;
  }


 /**
  * set and return login url
  * @param email 
  * @param password 
  */
 getUserLoginUrl(email, password)
 {
    let url = this.getServerUrl()+"login/user/"+email+"/password/";
    if(password)
      url += this.hashPassword(password);

    return url;
 }

 /**
  * show login form
  */
 async login()
 {
   /** create modal */
   const loginPageModal = await this.modalController.create({
    component: LoginPage,
    cssClass: 'login-modal'
  });

  /** show modal */
  await loginPageModal.present()
  let modalRes = await loginPageModal.onWillDismiss();
  if(!modalRes.data.dismissed)
    return this.getUser();
  else
    return false    
 }

/**
 * set and return rate wine url
 * @param wineId 
 * @param userId 
 * @param rate 
 */
getRateWineUrl(wineId, userId, rate=0)
{
  return this.getServerUrl()+'rate/set/wine/'+wineId+'/user/'+userId+'/rate/'+rate;
}

/**
 * set and return find wine url
 */
getFindWineUrl(text)
{
  return this.getServerUrl()+'wine/text/'+this.cleanString(text);
}

/**
 * set and return find wine url
 */
getWineRateValueUrl(wineId)
{
  return this.getServerUrl()+'wine-rate/'+wineId;
}

/**
 * set and return find wine url
 */
getNewUserRegisterUrl(name, firstname, gender, email, password=null)
{
  let url = this.getServerUrl()+'user/register/name/'+name+'/firstname/'+firstname+'/gender/'+gender+'/email/'+email+'/password/';
  
  if(password)
    url += this.hashPassword(password);
  
  return url;
}


 /**
  * hash password
  * @param password 
  */
 hashPassword(password)
 {
   //TODO: appliquer le hash
    // if(password == null || password == "")
    //   return null;
    // return Md5.hashStr(password);
    return password;
 }

 log(str)
 {
  this.debugStr += '\n----\n'+JSON.stringify(str);
 }

 getLog()
 {
   return this.debugStr;
 }


}
