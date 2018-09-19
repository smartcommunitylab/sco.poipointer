import { NgModule, ErrorHandler} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule,IonicErrorHandler} from 'ionic-angular';
import { MyApp } from './app.component';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { BLE } from '@ionic-native/ble';
import { InfoPage } from '../pages/info/info';
import { HomePage } from '../pages/home/home';
import { DataService } from '../services/data';
import { DettagliPage } from '../pages/dettagli/dettagli' ;
import { ImpostazioniPage } from '../pages/impostazioni/impostazioni' ;
import { FunzionalitaPage } from '../pages/funzionalita/funzionalita' ;
import { UtilizzoPage } from '../pages/utilizzo/utilizzo' ;
import { HttpClientModule } from '@angular/common/http';
import { SensorService} from '../services/ble.service';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { IonicStorageModule } from '@ionic/storage';
import { SettingService } from '../services/setting';

@NgModule({
 declarations: [
   MyApp,
   InfoPage,
   HomePage,
   DettagliPage,
   ImpostazioniPage,
   FunzionalitaPage,
   UtilizzoPage
 ],
 imports: [
   BrowserModule,
   IonicModule.forRoot(MyApp), HttpClientModule,
   IonicStorageModule.forRoot()
 ],
 bootstrap: [IonicApp],
 
 entryComponents: [
   MyApp,
   InfoPage,
   HomePage,
   DettagliPage,
   ImpostazioniPage,
   FunzionalitaPage,
   UtilizzoPage
 ],
 providers: [
   {provide: ErrorHandler, useClass: IonicErrorHandler},
   DataService, BLE, SensorService, LocalNotifications, TextToSpeech, SettingService
 ]
})
export class AppModule {}

