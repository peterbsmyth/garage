import { Injectable } from '@angular/core';
import { PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { CubeService } from '../services/cube.service';
import { ObjService } from '../services/garage.service';

@Injectable({
  providedIn: 'root',
})
export class ThreeFacade {
  constructor(private cube: CubeService, private garage: ObjService) {
    this.scene.add(this.camera);

    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.position.z = 3;
    this.camera.position.y = 1;
    this.renderer.render(this.scene, this.camera);
  }

  private scene = new Scene();
  private camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  public renderer = new WebGLRenderer();
  private bob = (() => {
    let counter = 0;
    return () => 0.05 * Math.sin(0.4 * counter++) + 1;
  })();

  public display(thing: string): void {
    this[thing].init(this.scene, this.camera, this.renderer);
  }

  public moveCamera(movement: 'left' | 'right' | 'in' | 'out'): void {
    const move = {
      left: () => {
        this.camera.rotation.y += 0.05;
      },
      right: () => {
        this.camera.rotation.y -= 0.05;
      },
      in: () => {
        this.camera.translateZ(-0.1);
        this.camera.position.y = this.bob();
      },
      out: () => {
        this.camera.translateZ(0.1);
        this.camera.position.y = this.bob();
      },
    };
    move[movement]?.();
    this.renderer.render(this.scene, this.camera);
  }

  public rotate(
    thing: string,
    direction: 'left' | 'right' | 'up' | 'down'
  ): void {
    const rotate = {
      left: () => (this[thing].rotation.y -= 0.1),
      right: () => (this[thing].rotation.y += 0.1),
      up: () => (this[thing].rotation.x += 0.1),
      down: () => (this[thing].rotation.x -= 0.1),
    };
    rotate[direction]?.();
    this.renderer.render(this.scene, this.camera);
  }
}
