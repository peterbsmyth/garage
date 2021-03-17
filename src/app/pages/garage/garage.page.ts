import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, interval, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { ThreeFacade } from 'src/app/application/three.facade';

@Component({
  templateUrl: './garage.page.html',
  styleUrls: ['./garage.page.scss'],
})
export class GaragePage implements OnInit, OnDestroy {
  constructor(public three: ThreeFacade) {}
  private unsubscribe = new Subject();
  private keyDownSubject: BehaviorSubject<string> = new BehaviorSubject(null);
  private keyUpSubject: BehaviorSubject<string> = new BehaviorSubject(null);
  private keyUp$ = this.keyUpSubject.asObservable();
  private keyDown$ = this.keyDownSubject.asObservable();
  private keys = [];

  // private keyCommand = {
  //   ArrowLeft: () => this.three.moveCamera('left'),
  //   ArrowRight: () => this.three.moveCamera('right'),
  //   ArrowUp: () => this.three.moveCamera('in'),
  //   ArrowDown: () => this.three.moveCamera('out'),
  //   w: () => this.three.moveCamera('in'),
  //   a: () => this.three.moveCamera('left'),
  //   s: () => this.three.moveCamera('out'),
  //   d: () => this.three.moveCamera('right'),
  // };

  private walk = () => {
    this.keys['ArrowLeft'] && this.three.moveCamera('left');
    this.keys['ArrowRight'] && this.three.moveCamera('right');
    this.keys['ArrowUp'] && this.three.moveCamera('in');
    this.keys['ArrowDown'] && this.three.moveCamera('out');
  };

  @HostListener('window:keydown', ['$event'])
  keyDown(k: KeyboardEvent): void {
    const { key } = k;
    this.keyDownSubject.next(key);
  }

  @HostListener('window:keyup', ['$event'])
  keyUp(k: KeyboardEvent): void {
    const { key } = k;
    this.keyUpSubject.next(key);
  }

  ngOnInit(): void {
    this.three.display('glb');
    interval(20).pipe(takeUntil(this.unsubscribe), tap(this.walk)).subscribe();
    this.keyDown$
      .pipe(
        takeUntil(this.unsubscribe),
        tap((key) => (this.keys[key] = true))
      )
      .subscribe();
    this.keyUp$
      .pipe(
        takeUntil(this.unsubscribe),
        tap((key) => (this.keys[key] = false))
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
