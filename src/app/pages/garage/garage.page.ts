import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { ThreeService } from 'src/app/services/three.service';

@Component({
  templateUrl: './garage.page.html',
  styleUrls: ['./garage.page.scss'],
})
export class GaragePage implements OnInit, OnDestroy {
  constructor(public three: ThreeService) {}
  private unsubscribe = new Subject();
  private keyDownSubject: BehaviorSubject<string> = new BehaviorSubject(null);
  keyDown$ = this.keyDownSubject.asObservable();
  private keyCommand = {
    ArrowLeft: () => this.three.rotateCube('left'),
    ArrowRight: () => this.three.rotateCube('right'),
    ArrowUp: () => this.three.rotateCube('up'),
    ArrowDown: () => this.three.rotateCube('down'),
    w: () => this.three.moveCamera('in'),
    a: () => this.three.moveCamera('left'),
    s: () => this.three.moveCamera('out'),
    d: () => this.three.moveCamera('right'),
  };

  @HostListener('window:keydown', ['$event'])
  keyDown(k: KeyboardEvent): void {
    const { key } = k;
    this.keyDownSubject.next(key);
  }

  ngOnInit(): void {
    this.keyDown$
      .pipe(
        takeUntil(this.unsubscribe),
        tap((key) => this.keyCommand[key]?.())
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
