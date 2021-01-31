import { Injectable } from '@angular/core';
import { animationFrameScheduler } from 'rxjs';
import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three';

@Injectable({
  providedIn: 'root',
})
export class ThreeService {
  private scene = new Scene();
  private camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  private geometry = new BoxGeometry();
  private material = new MeshBasicMaterial({ color: 0x00ff00 });
  private cube = new Mesh(this.geometry, this.material);
  public renderer = new WebGLRenderer();
  private animationScheduler = animationFrameScheduler;
  private subscription;

  constructor() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.scene.add(this.cube);
    this.camera.position.z = 3;
    this.renderer.render(this.scene, this.camera);
  }

  public start(): void {
    const that = this;
    this.subscription = this.animationScheduler.schedule(
      function (): void {
        this.schedule();
        that.cube.rotation.x += 0.01;
        that.cube.rotation.y += 0.01;
        that.renderer.render(that.scene, that.camera);
      },
      0,
      0
    );
  }

  public stop(): void {
    this.subscription.unsubscribe();
  }

  public moveCamera(movement: 'left' | 'right' | 'in' | 'out'): void {
    const move = {
      left: () => this.camera.position.x -= 0.1,
      right: () => this.camera.position.x += 0.1,
      in: () => this.camera.position.z -= 0.1,
      out: () => this.camera.position.z += 0.1,
    }
    move[movement]?.()
    this.renderer.render(this.scene, this.camera);
  }

  public rotateCube(direction: 'left' | 'right' | 'up' | 'down'): void {
    const rotate = {
      left: () => this.cube.rotation.y -= 0.1,
      right: () => this.cube.rotation.y += 0.1,
      up: () => this.cube.rotation.x += 0.1,
      down: () => this.cube.rotation.x -= 0.1,
    }
    rotate[direction]?.()
    this.renderer.render(this.scene, this.camera);
  }
}
