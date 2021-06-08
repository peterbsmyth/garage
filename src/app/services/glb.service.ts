import { Injectable } from '@angular/core';
import { AmbientLight, PointLight } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { BusyService } from './busy.service';

@Injectable({
  providedIn: 'root',
})
export class GlbService {
  private gltf;
  private loader;
  private loading = false;
  constructor(private busy: BusyService) {
    this.loader = new GLTFLoader();
    this.loader.load(
      'https://wyatts-garage.s3.us-east-2.amazonaws.com/garage.glb',
      (gltf) => {
        this.busy.decrement();
        this.gltf = gltf;
      },
      () => {
        if (!this.loading) {
          this.busy.increment();
          this.loading = true;
        }
      },
      (err) => {
        this.busy.decrement()
        console.error(err)
      }
    );
  }

  public init(scene, camera?, renderer?): void {
    const ambientLight = new AmbientLight(0xcccccc, 0.4);
    scene.add(ambientLight);

    const pointLight = new PointLight(0xffffff, 0.8);
    camera.add(pointLight);

    setTimeout(() => {
      scene.add(this.gltf.scene);
      renderer.render(scene, camera);
    }, 5000);
  }
}
