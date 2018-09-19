import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
@Injectable()
export class SettingService {
    
    private toggleStatus:boolean;

  constructor(private http: HttpClient) {
    
  }
  
  setSetting(toggleStatus:boolean) {
    this.toggleStatus=toggleStatus;
  }

  getSetting() {
    return this.toggleStatus;
  }

  
}