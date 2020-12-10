import { Component, NgModule, ViewChild } from '@angular/core';

/*
* camera import
*/
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

/*
* modal import
*/
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';
//import { WinePage } from '../wine/wine.page';

/*
* OCR import
*/
import { createWorker, recognize } from 'tesseract.js';

/*
* http import
*/
import '@capacitor-community/http';
import { HTTP } from '@ionic-native/http/ngx';

/**
 * router and environment import
 */
import { NavigationExtras, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

/**
 * models class import
 */
import { Wine } from '../app.models/Wine';
import { WineImage } from '../app.models/WineImage';

//data provider
import { DataService } from '../services/data.service'
import { ConfigurationPage } from '../configuration/configuration.page';
import { WineComment } from '../app.models/WineComment';
import { User } from '../app.models/User';
import { Rate } from '../app.models/Rate';

import { HttpClient} from '@angular/common/http';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  // authentified user
  user: User = null;

  // worker for ocr
  worker: Tesseract.Worker;
  // worker state flage
  workerReady = false;
  workerError: boolean = false;
  // progress
  captureProgress: number = 0;
  recognizing: boolean = false;

  // ocr text result
  text: string; //text result fro ocr
  
  // the taken photo
  photo : string; //

  // not found flag
  wineNotFound: boolean = false;

  // waiting server response flag
  lookingForWine: boolean = false;

  constructor(
    private sanitizer: DomSanitizer,
    private router: Router,
    private dataService: DataService,
    private http: HTTP,
    public modalController: ModalController) 
    {
      // get connected user
      this.user = dataService.userConnected();

      // initialize ocr
      this.loadWorker(); 
    }

    ngOnInit() {
     
    }
  
  
  /*
  * shazam : take photo > scan text > get wine form server
  */
  async shazam()
  {
    //##debug
    // this.text = "cadi";
    // this.getWine();return;

    /*
    * take photo
    */
    try {

      const photo = await Plugins.Camera.getPhoto({
        quality: 100,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera
      });

      this.photo = photo.dataUrl; 
    }
      /* cancelled by user */
    catch(err) {
      console.log("no photo was taken",err);  
      this.dataService.log(err);    
      return;
    }

    //** initialize flags for messages */
    this.wineNotFound = false;    
    this.lookingForWine = false; 

    this.captureProgress = 1;


    /**
     * reconize text from the taken photo 
     */
    await this.recognizeTextFromImage()
      .then(()=>{

        //get wine from the server using the recognized text
        this.getWine();

    }); 
  }

  /*
  * show login modal form 
  */
 async showLoginForm()
 {
    let authentifiedUser = await this.dataService.login();
    if(authentifiedUser)
      this.user = authentifiedUser; 
 }

  /*
  * show login modal form 
  */
 async showConfigForm()
 {
    /** create modal */
    const configPageModal = await this.modalController.create({
      component: ConfigurationPage,
      cssClass: 'config-modal'
    });

    /** show modal */
    return await configPageModal.present();
 }

 /*
 * initialize OCR
 */
 async loadWorker()
 {    
    console.log("starting worker...");
    this.dataService.log("starting worker..."); 
    try{
      /**
       * create worker with a logger
       */
      this.worker = createWorker({   
        logger: progress => {
          console.log(progress);

          if(progress.status == 'recognizing text')
          {
            this.captureProgress = parseInt('' + progress.progress * 100);
          }
        }
      });
    
      /**
       * load worker with language
       */
      await this.worker.load();
      await this.worker.loadLanguage('eng');
      await this.worker.initialize('eng');

      console.log("worker ready!!!!");

      /**
       * set workerReady and workerError Flag
       */
      this.workerReady = true;      
      this.workerError = false;
    }
    /**
     * error while loading worker
     */
    catch(err)
    {
      console.log(err);
      this.dataService.log(err); 
      this.workerError = true;
      return false;
    }
  }

  /**
   * reconize text from image
   */
  async recognizeTextFromImage(){
    console.log("start recognizing...");
    this.dataService.log("start recognizing...");

    // set recongnizing flag
    this.recognizing = true;

    await this.loadWorker();

    // extract text from photo
    const result = await this.worker.recognize(this.photo);

    // reset recognizing flag
    this.recognizing = false;

    //save the text    
    this.text = result.data.text;

    
    console.log("recognizing finished!!");
    this.dataService.log("recognizing finished!!");
    console.log(this.text);
    this.dataService.log(this.text);

    //return the text
    return result.data.text
  }

  /**
   * get wine data from server by using scanned text
   */
 async getWine()
 {
    // clean text
    if( !this.dataService.cleanString(this.text) )
    {
      this.wineNotFound = true;
      return false;
    }

    let cleanedText = this.dataService.cleanString(this.text);

    this.dataService.log('<--cleaned text : ');
    this.dataService.log(cleanedText);
    console.log('<--cleaned text : ');
    console.log(cleanedText);
    // set resquest url
    let findWineUrl = this.dataService.getFindWineUrl(cleanedText);

    // set server waiting flag
    this.lookingForWine = true; 
    await this.dataService.sendServerRequest({url: findWineUrl})
      /**
       * success
       */
      .then( data=>{
        console.log("data",data);
        this.dataService.log("data");
        this.dataService.log(data);
        
        // check if a wine has been found
        if(!data.data || data.data.length == 0)
        {
          this.wineNotFound = true;
          return false;
        }

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
          this.dataService.getServerImageDir() + wineData.image
        );

        // set comments, user and rate
        if(wineData.comments)
        {
          for(let comment of wineData.comments)
          {
            // set comment user
            let u = comment.user;
            let user = new User(
              u.id,
              u.name,
              u.firstname,
              u.gender,
              u.email
            )
            
            // add comment
            let c = comment.comment;
            wine.addComment( new WineComment(
              c.id,
              c.date,
              c.comment,
              user
            ))
            
            // add rate
            if( comment.rate )
            {
              let r = comment.rate;
              wine.addRate( new Rate(
                r.id,
                r.date,
                r.rate,
                user
              ));
            }

          }
        }

        console.log("--wine--",wine);
        this.dataService.log("--wine--");
        this.dataService.log(wine);
          // save wine
        this.dataService.setWine(wine);

        //go to wine page
        // this.router.navigate(['/tabs/wine']);
        this.router.navigate(['/wine']);
      })
      /**
       * error
       */
      .catch(err=>{
        console.log(err);
        this.dataService.log('<<http request error>>');
        this.dataService.log(err);
        return null;
      }); 
      // set server waiting flag
      this.lookingForWine = false;       
  }

  /**
   * log out user
   */
  logout(){
    if( confirm('log out?') )
    {
      this.user = null
      this.dataService.clearUser();
    }
  }

  debug()
  {
    alert( this.dataService.getLog() );
  }

}
