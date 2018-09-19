
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
  toggleStatus: any;
  
  constructor(public navCtrl: NavController,public tts:TextToSpeech, private storage: Storage,  private settingService: SettingService) {
    storage.ready().then(() => {
      storage.get('toggleStatus').then((val) => {
        console.log(`Setting status from storage to '${this.toggleStatus}'`);
        this.toggleStatus = val; 
      })
    });
  
  }
 
  change() {
    console.log(`changing toggleStatus to '${this.toggleStatus}'`);
    this.storage.set('toggleStatus', this.toggleStatus);
    
     if((this.toggleStatus==false)){
       this.tts.speak("").then((value)=>{
        //this.toggleStatus = false; 
        this.toggleStatus = this.settingService.getSetting(value);
        });  
    }
      
  }
  /* change(){
    console.log(this.toggle);
     this.tts.speak("").then((toggle)=>{
      this.toggle = false; 
      });

    }  */
 
    

//  ionViewDidEnter() {
    
    //this.sayText();
  //}

  //sayText(){
  //  this.tts.speak({
    //  text: "Impostazioni applicazione",
    //  locale: 'it-IT'
   // });
      //console.log("Successfully spoke");
  
  }
   
  