import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  constructor() { 

   // console.log("tab--",this.selectedIndex)
   //this.navCtrl.parent.select(2);
  }

  ngOnInit() {
  }

}
