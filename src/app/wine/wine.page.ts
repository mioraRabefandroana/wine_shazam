import { Component, OnInit } from '@angular/core';

//wine model import
import { Wine } from '../app.models/Wine'


/*
* http import
*/
import '@capacitor-community/http';
import { ActivatedRoute, Router } from '@angular/router';

import { DataService } from '../services/data.service';
import { Rate } from '../app.models/Rate';
import { CommentPage } from '../comment/comment.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-wine',
  templateUrl: './wine.page.html',
  styleUrls: ['./wine.page.scss'],
})
export class WinePage implements OnInit {

  // current wine
  wine: Wine; 

  // new rate value
  newRate: number;  

  // wine rate value
  wineRateValue: number = null;

  // rating flag
  onRating: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private modalController: ModalController) 
  {

    // initialize onRating flag
    this.onRating = false;
      
    /**
     * get wine sent in parametters
     */
    this.wine = this.dataService.getWine();
    
    // get wine rate value
    this.setWineRateValue();
    }

  ngOnInit() {
  }

  /**
   * show rating input
   */
  async rate()
  {
    // user must be connected
    if( this.dataService.userConnected())
    {
      // set rating flag to true
      this.onRating = true;
    }
    else
    {
      let authentified = await this.dataService.login();
      if(authentified)
        this.rate();
    }
  }

  /**
   * hide rating input
   */
  closeNewRate()
  {
    this.onRating = false;
  }

  /**
   * submit rate
   */
  async submitRate()
  {
    if(
      this.newRate &&
      this.newRate > 0  &&
      this.newRate <= 5
    )
    { 
      // set submit url
      let ratewineUrl = this.dataService.getRateWineUrl(
        this.wine.getId(),
        this.dataService.userConnected().getId(),
        parseInt( this.newRate.toString() )
      )

      await this.dataService.sendServerRequest({ url: ratewineUrl })
        .then(data=>{

          if(data.data)
          {
            if(data.data.action == 'update')
            {
              this.wine.removeRate(data.data.rate.id);
            }
            let rateData = data.data.rate;
            
            // create and add new rate
            this.wine.addRate( 
              new Rate(
                rateData.id,
                rateData.date,
                rateData.rate,
                rateData.user
              )
            )
            //update current wine
            this.dataService.setWine(this.wine);

            //update rate Value
            this.setWineRateValue()

            // hide rating input
            this.closeNewRate();

            
            // show success message
            alert("Rate added.")
            return true;
          }
          else
          {
            console.log(data);
            return false;
          }
        })
        .catch(err=>{
          console.log(err);
            // show error message
            alert("an error has occured")
          return false
        })
      }
      else
      {
        alert('not valid rate.');
      }
  }

  /**
   * get wine rate value (average rate)
   */
  public async setWineRateValue()
  {
      // make sure there is a wine
      if(!this.wine)
        return null;

      /**
       * get rate value form server
       */
      let rateValueUrl = this.dataService.getWineRateValueUrl(this.wine.getId());
      await this.dataService.sendServerRequest({ url: rateValueUrl})
      .then(data=>{
        this.wineRateValue = Math.round(data.data*10)/10;
      })
      .catch(err=>{
          console.log(err);
          return null;
      })
  }

  /**
    * show login form
    */
  async seeComment()
  {
    /** create modal */
    const commentModal = await this.modalController.create({
      component: CommentPage,
      cssClass: 'login-modal'
    });
    await commentModal.present();
  }
}
