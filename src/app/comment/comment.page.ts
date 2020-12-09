import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonInfiniteScroll } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { Rate } from '../app.models/Rate';
import { User } from '../app.models/User';
import { Wine } from '../app.models/Wine';
import { WineComment } from '../app.models/WineComment';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.page.html',
  styleUrls: ['./comment.page.scss'],
})
export class CommentPage implements OnInit {
  
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  wine: Wine;
  lastCommentId: number = null;

//## 09/12/2020
  data = [1];

  constructor(
    private dataService: DataService,
    public alertController: AlertController
  ) 
  {
    // get wine
    this.wine = dataService.getWine();    

    // set las comment id : for loading more comment
    this.setLastCommentId();
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
  
  /**
   * load more comment from the server
   * @param event 
   */
  async loadMoreComment(event) {

    // add a timout to notify user of loading more content
    setTimeout(async () => {

      event.target.disabled = true;

      // debugger;
      // set url for server request
      let moreCommentUrl = this.dataService.getMoreCommentUrl( this.wine.getId(), this.lastCommentId );

      // sent request
      await this.dataService.sendServerRequest({url: moreCommentUrl})
      // success request
      .then(data=>{

        /**
         * there was comment
         */
        if(data.data && data.data.length>0)
        {
          // add comment to the wine
          for(let comment of data.data)
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
            this.wine.addComment( new WineComment(
              c.id,
              c.date,
              c.comment,
              user
            ))
          
            // add rate
            if( comment.rate )
            {
              let r = comment.rate;
              this.wine.addRate( new Rate(
                r.id,
                r.date,
                r.rate,
                user
              ));

            }
          }

          // reset last comment id
          this.setLastCommentId();
        }
        else
        /**
         * there is no mmore comment
         */
        {
          //TODO : à determiner ce qu'il faut faire s'il n'y en a plus
        }
          
        
      event.target.complete();

      })
      // error request
      .catch(err=>{
        console.log(err);
        return false;
      });

      event.target.disabled = false;
    },100);


/*
    // debugger;
    setTimeout(() => {
      console.log('Done',this.data);
      event.target.complete();
      
      this.data.push(1);
      
      console.log('Done2',this.data);
      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.data.length == 10) {
        event.target.disabled = true;
      }
   }, 500);
*/

  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  /**
   * set last commentid value : the minimu id value (because id is sorted DESC)
   */
  setLastCommentId(){

    let commentId = this.lastCommentId || null;
    if(this.wine && this.wine.getCommentsAndRates().length>0)
    {
      let commentAndRates = this.wine.getCommentsAndRates();
      for(let data of commentAndRates)
      {
        let tmpId = data.comment.getId();
        if(!commentId || tmpId < commentId)
        {
          commentId = tmpId;
        }
      }
    }
    return this.lastCommentId = commentId;
  }

}
