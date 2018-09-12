
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
@Injectable()
export class DataService {

  private pois = {};
//  [
//    {title: 'Semaforo', id: 'id1', description: 'Semaforo con ausilio sonoro incrocio sulla statale', distance: "vicino", tipologia: "ostacolo"} , 
//    {title: 'Attraversamento pedonale', id: 'id2', description: 'Strisce pedonali con pavimento tattile', distance: "medio", tipologia: "x"},
//    {title: 'Farmacia', id: 'id3', description: 'Farmacia via Verdi', distance: "lontano", tipologia: "edificio"}
//  ];

  constructor(private http: HttpClient) {
    http.get('assets/sensors.json').subscribe(data => this.pois = data);
  }
  
  getPOIs() {
    return Object.keys(this.pois).map(id => this.pois[id]);
  }

  getPOI(id: string) {
    return this.pois[id];
  }

  
}