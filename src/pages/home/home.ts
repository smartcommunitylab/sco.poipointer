
import { Component, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular'
import { DataService } from '../../services/data';
import { DettagliPage } from '../dettagli/dettagli';
//import { TextToSpeech } from '@ionic-native/text-to-speech';
import { BLE } from '@ionic-native/ble';
import { InfoPage } from './../info/info';
import { ImpostazioniPage } from './../impostazioni/impostazioni';
import { SensorService } from '../../services/ble.service';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'


})
export class HomePage {
  
  title = 'A OCCHI CHIUSI';
  pois: any[];

  text: string;

  statusMessage: string;


  constructor( public navCtrl: NavController, public dataService: DataService, private sensorServices: SensorService, private ngZone: NgZone) {
    this.pois = sensorServices.getDevices();
    sensorServices.subscribeDevices().subscribe(device => {
      console.log('SUB: '+device.uuid);
      this.ngZone.run(() => {
        const old = this.pois.find(d => d.uuid == device.uuid);
        if (old == null) this.pois.push(device);
        else old.distance = device.distance;  
      });
    });
  }
  ionViewDidEnter() {
    //this.sayText();
    
  }

  //sayText(){
   // this.tts.speak({
     // text: "Sei nell'applicazione a occhi chiusi",
      //locale: 'it-IT'
    //});
     // console.log("Successfully spoke");
  
  
  



pushPage(id: string){

this.navCtrl.push(DettagliPage, {
  id: id
  
}
)
}


  viewInfo() {
    this.navCtrl.push(InfoPage, {

    }
  )
  }

  viewImpostazioni() {
    this.navCtrl.push(ImpostazioniPage, {

    }
  )
  }

  
  }
  



