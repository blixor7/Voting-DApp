// common-data.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonDataService {
  private commonDataSubject = new BehaviorSubject<any>({});
  commonData$ = this.commonDataSubject.asObservable();

  constructor() { }

  setData(key: string, value: any) {
    const updatedData = { ...this.commonDataSubject.value };
    updatedData[key] = value;
    this.commonDataSubject.next(updatedData);
  }

  getData(key: string): Observable<any> {
    return this.commonData$.pipe(map(data => data[key]));
  }
}