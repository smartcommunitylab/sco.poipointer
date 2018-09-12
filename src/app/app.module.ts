import { NgModule, ErrorHandler} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule,IonicErrorHandler} from 'ionic-angular';
import { MyApp } from './app.component';
//import { TextToSpeech } from '@ionic-native/text-to-speech';
import { BLE } from '@ionic-native/ble';
import { InfoPage } from '../pages/info/info';
import { HomePage } from '../pages/home/home';
import { DataService } from '../services/data';
import { DettagliPage } from '../pages/dettagli/dettagli' ;
import { ImpostazioniPage } from '../pages/impostazioni/impostazioni' ;
import { HttpClientModule } from '@angular/common/http';
import { SensorService} from '../services/ble.service';
import { LocalNotifications } from '@ionic-native/local-notifications';

@NgModule({
 declarations: [
   MyApp,
   InfoPage,
   HomePage,
   DettagliPage,
   ImpostazioniPage
 ],
 imports: [
   BrowserModule,
   IonicModule.forRoot(MyApp), HttpClientModule
 ],
 bootstrap: [IonicApp],
 
 entryComponents: [
   MyApp,
   InfoPage,
   HomePage,
   DettagliPage,
   ImpostazioniPage
 ],
 providers: [
   {provide: ErrorHandler, useClass: IonicErrorHandler },
   DataService, BLE, SensorService, LocalNotifications
 ]
})
export class AppModule {}

