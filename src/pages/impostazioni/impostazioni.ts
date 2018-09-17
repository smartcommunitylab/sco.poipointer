
import { Component} from '@angular/core';
import { NavController} from 'ionic-angular';
import { TextToSpeech } from '@ionic-native/text-to-speech';


@Component({
  selector: 'page-impostazioni',
  templateUrl: 'impostazioni.html'
})
export class ImpostazioniPage {
  
  public toggle:boolean=true;
  constructor(public navCtrl: NavController,public tts:TextToSpeech) {

   
  }


  change(){
    console.log(this.toggle);
    if(this.toggle==true){

    }
    else{
      this.tts.stop();
      console.log("stop tts");
    }


  }

  

    

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
  
  
  


