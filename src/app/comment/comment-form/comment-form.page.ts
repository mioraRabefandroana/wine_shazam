import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.page.html',
  styleUrls: ['./comment-form.page.scss'],
})
export class CommentFormPage implements OnInit {

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  /**
   * close modal
   */
  closeModal()
  {
    this.modalCtrl.dismiss({
      "dismissed": true
    })
  }

}
