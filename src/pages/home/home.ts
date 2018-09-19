
import { Component, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular'
import { DataService } from '../../services/data';
import { DettagliPage } from '../dettagli/dettagli';
//import { TextToSpeech } from '@ionic-native/text-to-speech';
import { BLE } from '@ionic-native/ble';
import { InfoPage } from './../info/info';
import { ImpostazioniPage } from './../impostazioni/impostazioni';
import { SensorService } from '../../services/ble.service';
import {Platform} from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'


})
export class HomePage {
  
  title = 'A OCCHI CHIUSI';
  pois: any[];

  text: string;

  statusMessage: string;
  bleEnabled: boolean;

  constructor( public navCtrl: NavController, private ble: BLE, public dataService: DataService,private platform: Platform, private sensorServices: SensorService, private ngZone: NgZone) {
    this.pois = sensorServices.getDevices();

    this.platform.ready().then((readySource) => {
      ble.isEnabled().then(()=>{
        console.log('enabled');
        this.bleEnabled=true;
      },()=>{
        console.log('disabled');
        this.bleEnabled=false;
      })
      return this.bleEnabled;
    })
    
    sensorServices.subscribeDevices().subscribe(device => {
      console.log('SUB: '+device.uuid);
      this.ngZone.run(() => {
        const old = this.pois.find(d => d.uuid == device.uuid);
        if (old == null) {
          console.log("is new")

          this.pois.push(device)
        }
        else {
          old.distance = device.distance;
          console.log("is old")
        }
  
      });
    })
    ;

    sensorServices.removerDevices().subscribe(device => {
      console.log('SUB: '+device.uuid);
      this.ngZone.run(() => {
        this.pois = this.pois.filter(obj => obj.uuid !== device.uuid);  
      });
    });
  }

  ionViewDidEnter() {
    
  }


  



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
  



