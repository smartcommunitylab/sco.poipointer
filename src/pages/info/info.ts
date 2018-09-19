import { Component, NgModule } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { FunzionalitaPage } from './../funzionalita/funzionalita';
import { UtilizzoPage } from './../utilizzo/utilizzo';
import { SettingService } from '../../services/setting';
import { Platform } from "ionic-angular";

@Component({
  selector: 'page-info',
  templateUrl: 'info.html'
})
export class InfoPage {

  testo= "L’applicazione 'nome' funge da ausilio integrativo per la persona non vedente o ipovedente, in quanto permette alla persona di avere conferma di dove si trova approssimativamente nel caso in cui perda l’orientamento. Tramite dei sensori posti sul territorio, il dispositivo riceve delle notifiche che segnalano se ci si è avvicinati o allontanati dal punto di interesse."
  constructor(public platform: Platform, public navCtrl: NavController, public tts:TextToSpeech, private settingService: SettingService) {
    
  }
  ionViewDidEnter() {
    
    this.sayText();
  }


  sayText(){
    if(this.settingService.getSetting()==true){
      if (this.platform.is('ios')) {
    this.tts.speak({
      text: "Introduzione generale:" + this.testo, 
      locale: 'it-IT',
      rate:1
    });
    }
    else{
      this.tts.speak({
        text: "Introduzione generale:" + this.testo,
        locale: 'it-IT'
      });
    }
  }
  }

  viewFunzionalita() {
    this.navCtrl.push(FunzionalitaPage, {

    }
  )
  }

  viewUtilizzo() {
    this.navCtrl.push(UtilizzoPage, {

    }
  )
  }

  }
  

  


