import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Wine } from '../app.models/Wine';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.page.html',
  styleUrls: ['./comment.page.scss'],
})
export class CommentPage implements OnInit {

  wine: Wine;
  constructor(
    private dataService: DataService,
    public alertController: AlertController
  ) 
  {
    this.wine = dataService.getWine();
  }

  ngOnInit() {
  }

  /**
   * comment wine
   */
  async comment()
  {

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Add Comment',
      /*subHeader: 'Add your comment',
      message: 'This is an alert message.',*/
      inputs: [
        {
          name: 'name1',
          type: 'textarea',
          placeholder: 'Type your comment...'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, 
        {
          text: 'OK',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });

    let res = await alert.present();
    console.log(res);

    
  }
  
}
