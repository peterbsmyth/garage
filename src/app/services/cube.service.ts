import { Injectable } from '@angular/core';
import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three';

@Injectable({
  providedIn: 'root',
})
export class CubeService {
  private geometry = new BoxGeometry();
  private material = new MeshBasicMaterial({ color: 0x00ff00 });
  public cube = new Mesh(this.geometry, this.material);

  public rotate(direction: 'left' | 'right' | 'up' | 'down'): void {
    const rotate = {
      left: () => (this.cube.rotation.y -= 0.1),
      right: () => (this.cube.rotation.y += 0.1),
      up: () => (this.cube.rotation.x += 0.1),
      down: () => (this.cube.rotation.x -= 0.1),
    };
    rotate[direction]?.();
  }
}
