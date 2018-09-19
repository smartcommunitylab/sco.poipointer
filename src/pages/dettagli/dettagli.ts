import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { DataService } from '../../services/data';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { SettingService } from '../../services/setting';



@Component({
 selector: 'page-dettagli',
 templateUrl: 'dettagli.html'
})
export class DettagliPage{
 poi: any;
 

constructor( private navParams: NavParams, private dataService: DataService, private tts:TextToSpeech, private settingService: SettingService){


 }

ionViewDidEnter(){
let id = this.navParams.get('id');
 this.poi = this.dataService.getPOI(id);
 this.sayText();

}


sayText(){
  if(this.settingService.getSetting()==true){
 this.tts.speak({
    text: "Punto di interesse:" + this.poi.title + ". Posizione" + this.poi.distance +  ". Tipologia" + this.poi.tipologia + ". Descrizione" + this.poi.description,
    locale: 'it-IT'
  });
    console.log("Successfully spoke");
}}}










 

