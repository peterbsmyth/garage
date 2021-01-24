import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThreeService {
  private countSubject: BehaviorSubject<number> = new BehaviorSubject(0);
  public count$: Observable<number> = this.countSubject.asObservable();

  constructor() {
    let count = 0;
    setInterval(() => {
      this.countSubject.next(++count);
    }, 1000);
  }
}
