
import { Component} from '@angular/core';
import { NavController} from 'ionic-angular';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { Storage } from '@ionic/storage';
import { SettingService } from '../../services/setting';

@Component({
  selector: 'page-impostazioni',
  templateUrl: 'impostazioni.html'
})
export class ImpostazioniPage {
  public toggleStatus: any;

  constructor(public navCtrl: NavController,public tts:TextToSpeech, private storage: Storage,  private settingService: SettingService) {
    storage.ready().then(() => {
      storage.get('toggleStatus').then((val) => {
        console.log(`Setting status from storage to '${this.toggleStatus}'`);
        //this.toggleStatus = val; 
        this.toggleStatus = settingService.getSetting();
      })
    });
  
  }
 
  change() {
    console.log(`changing toggleStatus to '${this.toggleStatus}'`);
    this.storage.set('toggleStatus', this.toggleStatus);
    this.settingService.setSetting(this.toggleStatus);
     if((this.settingService.getSetting()==false)){
       this.tts.speak("").then((value)=>{
        
        });  
    }
      
  }
  
    


  
  }
