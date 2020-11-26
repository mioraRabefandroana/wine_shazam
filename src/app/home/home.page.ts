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


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  takenPicture : SafeResourceUrl;
  constructor(
    private sanitizer: DomSanitizer,
    public modalController: ModalController) {}

  /*
  * take picture by using camera
  */
  async takePicture()
  {
    const photo = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });

    this.takenPicture = this.sanitizer.bypassSecurityTrustResourceUrl(photo && (photo.dataUrl));
  }

  /*
  * show login modal form 
  */
 async showLoginForm()
 {
    const loginPageModal = await this.modalController.create({
      component: LoginPage,
      cssClass: 'login-modal'
    });

    return await loginPageModal.present();
 }

 


}
