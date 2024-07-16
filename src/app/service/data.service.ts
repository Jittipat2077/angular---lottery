import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  apiEndpoint = 'http://localhost/webapi';

  constructor() {}
  Member: any;

  private mem_id: number | null = null;
  SetMemId(mem_id: number) {
    this.mem_id = mem_id;
  }

  getAcId() {
    return this.mem_id;
  }

  private userDataSubject = new BehaviorSubject<any>(null);
  userData$ = this.userDataSubject.asObservable();

  SetUser(userData: any) {
    this.userDataSubject.next(userData);
  }
}
