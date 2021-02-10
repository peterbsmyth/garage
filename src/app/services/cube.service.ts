import { Injectable } from '@angular/core';
import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three';

@Injectable({
  providedIn: 'root',
})
export class CubeService {
  private geometry = new BoxGeometry();
  private material = new MeshBasicMaterial({ color: 0x00ff00 });
  private cube = new Mesh(this.geometry, this.material);

  public init(scene, camera?, renderer?): void {
    scene.add(this.cube);
    renderer.render(scene, camera);
  }
}
