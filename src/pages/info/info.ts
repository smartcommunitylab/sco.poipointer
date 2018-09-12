import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//import { TextToSpeech } from '@ionic-native/text-to-speech';

@Component({
  selector: 'page-info',
  templateUrl: 'info.html'
})
export class InfoPage {

  constructor(public navCtrl: NavController) {

  }
  ionViewDidEnter() {
    
   // this.sayText();
  }


  //sayText(){
    //this.tts.speak({
     // text: "Informazioni",
      //locale: 'it-IT'
    //});
      //console.log("Successfully spoke");
  
  
  }

  


