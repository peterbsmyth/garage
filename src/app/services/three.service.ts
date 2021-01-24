import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ThreeService {
  private countSubject: BehaviorSubject<number> = new BehaviorSubject(0);
  public count$: Observable<number> = this.countSubject.asObservable();

  constructor() {
    let count = this.countSubject.getValue();
    interval(1000)
      .pipe(
        tap(() => {
          this.countSubject.next(++count);
        })
      )
      .subscribe();
  }
}
