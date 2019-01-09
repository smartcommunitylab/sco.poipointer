import { Injectable } from "@angular/core";
import { Platform } from "ionic-angular";
import { BLE } from "@ionic-native/ble";
import { LocalNotifications } from "@ionic-native/local-notifications";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import {NavController,App} from "ionic-angular/index";
import { DettagliPage} from "./../pages/dettagli/dettagli";
import { DataService } from './data';



const arrayAsHeyString = (arr) => {
    return Array.from(arr, function(byte: number) {
      return ('0'+byte.toString(16)).slice(-2);
    }).join('').toUpperCase();
  }
  
  const asHexString = (i) => {
    let hex = ('0'+i.toString(16)).slice(-2);;
    return "0x" + hex;
  };
  
  const parseAdvertisingData = (buffer) => {
    var length, type, data, i = 0, advertisementData = {};
    var bytes = new Uint8Array(buffer);
  
    while (length !== 0) {
  
        length = bytes[i] & 0xFF;
        i++;
  
        // decode type constants from https://www.bluetooth.org/en-us/specification/assigned-numbers/generic-access-profile
        type = bytes[i] & 0xFF;
        i++;
  
        data = bytes.slice(i, i + length - 1).buffer; // length includes type byte, but not length byte
        i += length - 2;  // move to end of data
        i++;
  
        advertisementData[ asHexString(type)] = data;
    }
  
    return advertisementData;
  }
  
@Injectable()
export class SensorService {

    private bgMode = false;
    private devices: any = {};
    private deviceGenerator: Subject<any>;
    private deviceRemover: Subject<any>;
    private navCtrl:NavController;


    public subscribeDevices(): Observable<any> {
        return this.deviceGenerator;
    }
    public removerDevices(): Observable<any> {
        return this.deviceRemover;
    }
    public getDevices(): any[] {
        return Object.keys(this.devices).map(key => this.devices[key]);
    }

    private processDevice(device, platform) {

        var uuid = null;
        if (this.platform.is('ios')) {
          if (device.advertising && device.advertising.kCBAdvDataServiceData) {
            const mfgData = new Uint8Array(device.advertising.kCBAdvDataServiceData['FEAA']);
            uuid = arrayAsHeyString(mfgData).substring(4,36);
          }
        }
        else if (this.platform.is('android')) {
          const data = parseAdvertisingData(device.advertising);
          const serviceData = data['0x16'];
          if (serviceData) {
              // first 2 bytes are the 16 bit UUID
              var uuidBytes = new Uint8Array(serviceData.slice(4, -2));
              uuid = arrayAsHeyString(uuidBytes);
          }
        }
        const poi = this.dataServices.getPOI(uuid);
        if(poi==null) {
            return;
        }
        poi.uuid = uuid;
        const dis = this.calculateDistance(device.rssi);
        const distance= this.convert(device.rssi);
        poi.updated = new Date().getTime();

        console.log(uuid + ":" + device.rssi + ":"+ dis + ":" +distance);


        if (!this.devices[poi.uuid]){
            this.devices[poi.uuid] = poi;
            poi.distance = distance;
            this.deviceGenerator.next(poi);
            if(dis>=-90){  //TODO: questo caso è molto difficile che si verifichi in quanto il cellulare non può apparire a 25m dal nulla, sarà prima a 60m poi 30m e poi 25m, ma a questo punto l'app è già nel 'else'
                this.notifyDevice(poi);
            }
            
        } else {
            if (this.devices[poi.uuid].distance != distance) { //TODO: questo controllo fa scattare le notifiche sia quando ci si avvicina, sia quando ci si allontana
                this.devices[poi.uuid].distance = distance;
                this.deviceGenerator.next(poi);
                this.notifyDevice(poi);
            }
            this.devices[poi.uuid].updated = new Date().getTime(); //TODO: questo magari è meglio metterlo fuori dall'if/else
        }
    }

    private calculateDistance(rssi) {
        var txPower = -50 //hard coded power value. Usually ranges between -59 to -65 //TODO: PROVARE CON -50, ERA -60
        return Math.floor(Math.pow(10, (txPower - rssi) / (10 * 2))) ||0; //TODO: perché || 0? Non rischia di ritornare un valore logico (True/Fals) invece della distanza?
   
    }

    convert(dis){
        if(dis>=-65){
            var distance = dis.toString();
            distance="Sei molto vicino";
        }
        if(dis<-65 && dis>=-80){
            var distance = dis.toString();
            distance="Sei vicino";
        }
        if(dis<-80){
            var distance = dis.toString();
            distance="Sei lontano";
        }
        return distance;
    }



    private notifyDevice(poi) {
        if (this.bgMode) {
            // if we're in the background, add a local notification
            var localNotification = {
                title: 'Segnale sensore rilevato',
                text: poi.title,
                data: {id:poi.uuid}
                
            };
            this.localNotifications.schedule(localNotification);
        }
       

        }    

    






            

 
    
 

    private startScan() {
      const arr = ['FEAA'];
      this.ble.startScanWithOptions(arr, { reportDuplicates: true})
      .subscribe((device) => this.processDevice(device, this.platform));
      setInterval(() => {
        const now = new Date().getTime();
        for (let key in this.devices) {
            const device = this.devices[key];
            if (now - device.updated > 5000) {
                this.deviceRemover.next(this.devices[key]);
                delete this.devices[key];
        }
    }
      }, 5000);
    }
    



    constructor(public platform: Platform, public ble: BLE,private app:App, private localNotifications: LocalNotifications, private dataServices: DataService) {
        this.deviceGenerator = new Subject();
        this.deviceRemover = new Subject();
        this.navCtrl = app.getActiveNav();
       this.platform.ready().then(() => {
           
            
            this.localNotifications.on('click').subscribe(event =>{
                this.navCtrl.push(DettagliPage, {
                  id: event.data.id
               }
                 )
            console.log(JSON.stringify(event));

            });

            this.platform.pause.subscribe(() => setTimeout(() => {
                this.bgMode = true;
            }, 5000));
            this.platform.resume.subscribe(() => {
                this.bgMode = false;
            });    
            this.startScan();
 
 
        });
 
 
 }
}
 
 




