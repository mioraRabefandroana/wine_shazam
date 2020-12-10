import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonInfiniteScroll, ModalController, LoadingController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { Rate } from '../app.models/Rate';
import { User } from '../app.models/User';
import { Wine } from '../app.models/Wine';
import { WineComment } from '../app.models/WineComment';
import { DataService } from '../services/data.service';
import { CommentFormPage } from './comment-form/comment-form.page';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.page.html',
  styleUrls: ['./comment.page.scss'],
})
export class CommentPage implements OnInit {
  
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  // current wine
  wine: Wine;

  // last comment id: the min id
  lastCommentId: number = null;

  //commenting flag
  commenting: boolean = false;
  newComment: string = null;

  constructor(
    private dataService: DataService,
    public alertController: AlertController,
    private modalCtrl: ModalController
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
   * comment wine : show comment input
   */
  async comment()
  {
    // user must be connected
    if( this.dataService.getUser())
    {
      // set commenting flag to true
      this.commenting = true;
    }
    else
    {
      // show login form
      let authentified = await this.dataService.login();
      if(authentified)
        this.comment();
    }
  }
  
  /**
   * hide new comment input
   */
  async closeNewComment()
  {
    this.commenting = false;
  }
  
  /**
   * hide new comment input
   */
  async submitComment()
  {    
    // create new comment url
    let newCommentUrl = this.dataService.getSubmitCommentUrl(
      this.wine.getId(),
      this.dataService.userConnected().getId(),
      this.newComment
    );
    // submit comment to server
    await this.dataService.sendServerRequest({ url: newCommentUrl })
    .then(data=>{

      if(data.data)
      {
        let commentData = data.data;
        // create new comment
        let newComment = new WineComment(
          commentData.id,
          commentData.date,
          commentData.comment,
          this.dataService.userConnected()
        );        
        
        // add wine new comment at first index
        this.wine.addComment(newComment, true);
        
        // update current wine
        this.dataService.setWine( this.wine );

        // clear data
        this.newComment = null;
        this.commenting = false;

        // show success message
        alert("Success: your comment has been added.");
      }
      else
      {
        console.log(data);
        alert('An error ha occured.');
        return false;
      }

    })
    .catch(err=>{
      console.log(err);
      alert('An error ha occured.');
      return false;
    })
  }

  /**
   * load more comment from the server
   * @param event 
   */
  async loadMoreComment(event) {

    // add a timout to notify user of loading more content
    setTimeout(async () => {

      // disable while loading data
      event.target.disabled = true;

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
        event.target.complete();
      })
      // error request
      .catch(err=>{
        console.log(err);
        return false;
      });

      event.target.disabled = false;
    },100);

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

  
  /*
  * close comment modal
  */
 async closeModal()
 {
   this.modalCtrl.dismiss({
     "dismissed": true
   })
 }

}
