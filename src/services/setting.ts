import { Injectable } from '@angular/core'

@Injectable()
export class SettingService {
    
    toggleStatus=true;
    //private toggleStatus:any

  constructor() {
    
  }
  
  setSetting(toggleStatus:boolean) {
    
    this.toggleStatus=toggleStatus;
  }

  getSetting() {
    return this.toggleStatus;
  }

  
}