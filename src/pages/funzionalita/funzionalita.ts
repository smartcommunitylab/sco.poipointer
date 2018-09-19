import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { SettingService } from '../../services/setting';
import { Platform } from "ionic-angular";

@Component({
  selector: 'page-funzionalita',
  templateUrl: 'funzionalita.html'
})
export class FunzionalitaPage {
  titolo="Funzionalità dell'applicazione"
  titolo1="NOTIFICA PUNTO DI INTERESSE:"
  testo1="Le notifiche ti avvisano ogni volta che il dispositivo riceve dei segnali da un sensore posto in corrispondenza di un punto di interesse. Aprendo la notifica accedi direttamente alla pagina dettagli di quel punto, che ti indicherà tutte le informazioni necessarie."
  titolo2="LISTA PUNTI DI INTERESSE:"
  testo2="Aprendo l'applicazione si accede alla lista con elencati i punti di interesse attivi rilevati. Facendo doppio click sul nome del punto di interesse si apre la lista dettagli."
  titolo3="DISTANZA DA UN PUNTO DI INTERESSE:"
  testo3="La distanza da un punto di interesse viene segnalata con tre espressioni. 'Sei molto vicino' significa che si è a meno di 5 metri dal sensore, 'sei vicino' ci si trova tra i 5 e i 15 metri, 'sei lontano' si è a più di 15 metri."
  constructor(public platform: Platform, public navCtrl: NavController, public tts:TextToSpeech, private settingService: SettingService) {
    
  }
  ionViewDidEnter() {
    
    this.sayText();
  }

  sayText(){
    if(this.settingService.getSetting()==true){
      if (this.platform.is('ios')) {
    this.tts.speak({
      text: this.titolo + this.titolo1 + this.testo1 + this.titolo2 + this.testo2 + this.titolo3 + this.testo3,
      locale: 'it-IT',
      rate:1
    });
      console.log("Successfully spoke");
  
  }
  else{
    this.tts.speak({
      text: this.titolo + this.titolo1 + this.testo1 + this.titolo2 + this.testo2 + this.titolo3 + this.testo3,
      locale: 'it-IT'
    });
  }
}}
}    