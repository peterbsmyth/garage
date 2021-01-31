import { Component, OnInit } from '@angular/core';
import { ThreeService } from 'src/app/services/three.service';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  templateUrl: './garage.page.html',
  styleUrls: ['./garage.page.scss'],
})
export class GaragePage implements OnInit {
  constructor(public three: ThreeService) {}
  private keyCommand = {
    ArrowLeft: () => this.three.rotateCube('left'),
    ArrowRight: () => this.three.rotateCube('right'),
    ArrowUp: () => this.three.rotateCube('up'),
    ArrowDown: () => this.three.rotateCube('down'),
    w: () => this.three.moveCamera('in'),
    a: () => this.three.moveCamera('left'),
    s: () => this.three.moveCamera('out'),
    d: () => this.three.moveCamera('right'),
  }

  ngOnInit(): void {
    const keyDown = fromEvent(document,'keydown').pipe(
      map((k: KeyboardEvent) => (k.key))
    );
    keyDown.subscribe(key => this.keyCommand[key]?.())
  }
}
