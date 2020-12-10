import { mapToMapExpression } from '@angular/compiler/src/render3/util';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { User } from '../app.models/User';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  // email and password : login
  email: string = "mra@map.fr";
  password: string = null;

  // login/register mode flag
  loginMode: boolean = true;

  // new user : register
  newUser = {
    name: null,
    firstname: null,
    gender: 'M',
    email: null,
    password: null
  };

  constructor(
    private modalCtrl: ModalController,
    private dataService: DataService) {

      this.loginMode = true;
  }

  ngOnInit() {
  }


  /**
   * login
   */
  async login()
  {
    let loginUrl = this.dataService.getUserLoginUrl(this.email, this.password);
    console.log("loginUrl",loginUrl)
    await this.dataService.sendServerRequest({url: loginUrl})
    .then(data=>{
      // debugger;
      if(data.data)
      {
        // not valid user
        if(!data.data.user)
        {
          alert("Error: email or password not valid.");
        }

        // valid user
        else
        {
          // create authentified user
          let userData = data.data.user;
          let user = new User(
            userData.id,
            userData.name,
            userData.firstname,
            userData.gender,
            userData.email
          );

          // save authentified user
          this.dataService.setUser(user);
          // close modal: go back home page
          this.modalCtrl.dismiss({"dismissed": false});
          return true;
        }
      }
    })
    .catch(err=>{
      alert("an error has occured.");
      return false;
    })
  }

  /**
   * create new user account : show register form
   */
  createAccount()
  {
    this.loginMode = false;
  }

  /**
   * submit new user to server
   */
  async register()
  {
    // set url request
    let registerUrl = this.dataService.getNewUserRegisterUrl(
      this.newUser.name,
      this.newUser.firstname,
      this.newUser.gender,
      this.newUser.email,
      this.newUser.password
    );

    // submit data to server
    await this.dataService.sendServerRequest({ url: registerUrl })
    .then(data=>{
        if(data.data && data.data.status)
        {
          // success
          if(data.data.status == 'success')
          {
            alert('Your account has been created.');
            this.loginMode = true;
          }
          // email already used
          else
          {
            alert('Email already used.');
          }
        }
        else
        {
          alert("an error has occured.");
          return false;
        }
    })
    .catch(err=>{
      console.log(err);
      alert("an error has occured.");
    })
  }

  /**
   * abort register
   */
  async abortRegister()
  {
    this.loginMode = true;
  }

  /*
  * close login modal
  */
  async closeModal()
  {
    this.modalCtrl.dismiss({
      "dismissed": true
    })
  }



}
