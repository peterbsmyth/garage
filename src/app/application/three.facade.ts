import { Injectable } from '@angular/core';
import {
  AmbientLight,
  PerspectiveCamera,
  PointLight,
  Scene,
  WebGLRenderer,
} from 'three';
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

  public display(thing: string): void {
    if (thing === 'cube') {
      this.scene.add(this.cube.cube);
      this.renderer.render(this.scene, this.camera);
    }
    if (thing === 'garage') {
      const ambientLight = new AmbientLight(0xcccccc, 0.4);
      this.scene.add(ambientLight);

      const pointLight = new PointLight(0xffffff, 0.8);
      this.camera.add(pointLight);
      setTimeout(() => {
        const that = this;
        this.scene.add(this.garage.garage);
        that.renderer.render(that.scene, that.camera);
      }, 2000);
    }
  }

  public moveCamera(movement: 'left' | 'right' | 'in' | 'out'): void {
    const move = {
      left: () => (this.camera.position.x -= 0.1),
      right: () => (this.camera.position.x += 0.1),
      in: () => (this.camera.position.z -= 0.1),
      out: () => (this.camera.position.z += 0.1),
    };
    move[movement]?.();
    this.renderer.render(this.scene, this.camera);
  }

  public rotate(
    thing: string,
    direction: 'left' | 'right' | 'up' | 'down'
  ): void {
    this[thing].rotate(direction);
    this.renderer.render(this.scene, this.camera);
  }
}
