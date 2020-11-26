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

/*
* OCR import
*/
import { createWorker, recognize } from 'tesseract.js';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  worker: Tesseract.Worker;
  workerReady = false;
  captureProgress = 0;

  ocrResult: string;


  takenPicture : string; //


  constructor(
    private sanitizer: DomSanitizer,
    public modalController: ModalController) {

      this.loadWorker();

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
      /* canceled by user */
    catch(err) {
      console.log("no photo was taken",err);
      
      return;
    }

    /** reconize text from the taken photo */
    await this.recognizeTextFromImage(); 
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

    this.worker = createWorker({   
      logger: progress => {
        console.log(progress);

        if(progress.status == 'recognizing text')
        {
          this.captureProgress = parseInt('' + progress.progress * 100);
        }
      }
    });

    await this.worker.load();
    await this.worker.loadLanguage('eng');
    await this.worker.initialize('eng');

    console.log("worker ready!!!!");

    this.workerReady = true;
  }

  /*
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

}
