import { Component } from '@angular/core';

/*
* camera import
*/
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

/*
* modal import
*/
import { ModalController } from '@ionic/angular';
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

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  worker: Tesseract.Worker;
  workerReady = false;
  captureProgress = 0;

  ocrResult: string; //text result fro ocr
  
  //url: string = "https://pedago01c.univ-avignon.fr/~uapv2101281/"; //server url

  takenPicture : string; //

  wineData;
  wineTest: Wine;//= new Wine(1,"wine 1","this is the des of wine1","bottled in old fashion","Bordeaux chateau",100,[new WineImage(1  ,"wine1.jpg")]);
  workerError: boolean = false;

  constructor(
    private sanitizer: DomSanitizer,
    private router: Router,
    private dataService: DataService,
    public modalController: ModalController) {

      this.loadWorker();  return;

      let tmpIcons = [];
      //let i = new WineImage(1  ,"wine1.jpg");
      //tmpIcons.push(i);

      this.wineTest = new Wine(1,"wine 1","this is the des of wine1","bottled in old fashion","Bordeaux chateau",100,tmpIcons);
      console.log(this.wineTest);

      this.dataService.setWine(this.wineTest);

      let wine = this.wineTest;
      /**
       * add wine into navigation extra parametters
       */
      let navigationExtras: NavigationExtras = {
        state: {
          wine: wine
        }
      };
      // go to wine page and send the wine using navigation extra parametters
      this.router.navigate(['/wine'], navigationExtras);
    }

  /*
  * take picture by using camera
  */
  async takePicture()
  {
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

      this.takenPicture = photo.dataUrl; // this.sanitizer.bypassSecurityTrustResourceUrl(photo && ());

    }
      /* cancelled by user */
    catch(err) {
      console.log("no photo was taken",err);      
      return;
    }

    /** reconize text from the taken photo */
    await this.recognizeTextFromImage().then(()=>{
      this.getWine();
    }); 
  }

  /*
  * show login modal form 
  */
 async showLoginForm()
 {
    /** create modal */
    const loginPageModal = await this.modalController.create({
      component: LoginPage,
      cssClass: 'login-modal'
    });

    /** show modal */
    return await loginPageModal.present();
 }

 /*
 * initialize OCR
 */
 async loadWorker()
  {    
    console.log("starting worker...");
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
      this.workerError = true;
      return false;
    }
  }

  /**
   * reconize text from image
   */
  async recognizeTextFromImage(){
    console.log("start recognizing...");

    const result = await this.worker.recognize(this.takenPicture);

    
    console.log("recognizing finished!!");
    console.log(result);

    this.ocrResult = result.data.text;

    console.log(this.ocrResult);

    return result.data.text
  }

  /**
   * get wine data from server by using scanned text
   */
 async getWine()
 {
   /**
    * post the ocr text result
    */
    let postData = {
      text: this.ocrResult
    };
    console.log("url",this.dataService.getServerUrl());
    console.log("postData",postData);

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
      console.log(data.data);return;
      this.wineData = data.data;
      let wineData = data.data;
      /**
       * create wine icons
       */
      let wineIcons = [];
      for(let wineIcon of wineData.icons)
      {
        wineIcons.push( new WineImage(wineIcon.id,wineIcon.name) );
      }
      /**
       * create wine
       */
      /*##
      let wine = new Wine(
        wineData.id,
        wineData.name,
        wineData.description,
        wineData.botling,
        wineData.castle,
        wineData.price,
        wineIcons
        );
      */
      let wine = this.wineTest;
        /**
         * add wine into navigation extra parametters
         */
        let navigationExtras: NavigationExtras = {
          state: {
            wine: wine
          }
        };
        // go to wine page and send the wine using navigation extra parametters
        this.router.navigate(['/wine'], navigationExtras);

    })
    /**
     * error
     */
    .catch(err=>{
      console.log(err);
      return null;
    })
 }

}
