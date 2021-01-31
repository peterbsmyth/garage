import { Injectable } from '@angular/core';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

@Injectable({
  providedIn: 'root',
})
export class ObjService {
  public garage;
  private loader;

  constructor() {
    this.loader = new OBJLoader();
    this.loader.load(
      '/assets/garage.obj',
      (obj) => {
        this.garage = obj;
      },
      () => {},
      (err) => console.error(err)
    );
  }

  public rotate(direction: 'left' | 'right' | 'up' | 'down'): void {
    const rotate = {
      left: () => (this.garage.rotation.y -= 0.1),
      right: () => (this.garage.rotation.y += 0.1),
      up: () => (this.garage.rotation.x += 0.1),
      down: () => (this.garage.rotation.x -= 0.1),
    };
    rotate[direction]?.();
  }
}
