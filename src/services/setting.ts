import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
@Injectable()
export class SettingService {
    toggleStatus: any;
  

  constructor(private http: HttpClient) {
    
  }
  
  setSetting() {
    return this.toggleStatus
  }

  getSetting(value: boolean) {
    return this.toggleStatus;
  }

  
}