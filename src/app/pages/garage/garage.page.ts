import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { ThreeFacade } from 'src/app/application/three.facade';

@Component({
  templateUrl: './garage.page.html',
  styleUrls: ['./garage.page.scss'],
})
export class GaragePage implements OnInit, OnDestroy {
  constructor(public three: ThreeFacade, private route: ActivatedRoute) {}
  private unsubscribe = new Subject();
  private keyDownSubject: BehaviorSubject<string> = new BehaviorSubject(null);
  private thing = '';
  keyDown$ = this.keyDownSubject.asObservable();
  private keyCommand = {
    ArrowLeft: () => this.three.rotate(this.thing, 'left'),
    ArrowRight: () => this.three.rotate(this.thing, 'right'),
    ArrowUp: () => this.three.rotate(this.thing, 'up'),
    ArrowDown: () => this.three.rotate(this.thing, 'down'),
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
    this.thing = this.route.snapshot.params.thing;
    this.three.display(this.thing);
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
