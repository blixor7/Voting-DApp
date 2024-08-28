// common-data.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonDataService {
  public commonData: any = {};

  constructor() { }

  setData(key: string, value: any) {
    this.commonData[key] = value;
  }

  getData(key: string) {
    return this.commonData[key];
  }
}