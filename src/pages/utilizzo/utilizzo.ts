import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { SettingService } from '../../services/setting';
import { Platform } from "ionic-angular";

@Component({
  selector: 'page-utilizzo',
  templateUrl: 'utilizzo.html'
})
export class UtilizzoPage {
  titolo="Utilizzo dell'applicazione"
  titolo1="ATTIVAZIONE DELLA APP:"
  testo1="Per attivare l’applicazione è sufficiente cliccare sull’icona. L’applicazione è funzionante, anche in background, soltanto quando bluetooth e gps sono attivi. Per chiudere definitivamente l’app è necessario cancellarla dalla finestra delle applicazioni aperte."
  constructor(public platform: Platform, public navCtrl: NavController, public tts:TextToSpeech, private settingService: SettingService) {

  }
  ionViewDidEnter() {
    
    this.sayText();
  }

  sayText(){
    if(this.settingService.getSetting()==true){
      if (this.platform.is('ios')) {
    this.tts.speak({
      text: this.titolo + this.titolo1 + this.testo1,
      locale: 'it-IT',
      rate:1
    });
    }
    else{
      this.tts.speak({
        text: this.titolo + this.titolo1 + this.testo1,
        locale: 'it-IT'
      });
    }
  
    }
  }
  }