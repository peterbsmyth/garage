import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BusyService } from '../services/busy.service';

@Injectable({
  providedIn: 'root'
})
export class NetworkStatusFacade {
  public loading$: Observable<boolean> = this.busyService.loading$

  constructor(
    private busyService: BusyService
  ) {}
}
