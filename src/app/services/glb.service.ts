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
        this.gltf = gltf;
      },
      () => {
        if (!this.loading) {
          
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
    const that = this
    const ambientLight = new AmbientLight(0xcccccc, 0.4);
    scene.add(ambientLight);

    const pointLight = new PointLight(0xffffff, 0.8);
    camera.add(pointLight);

    this.busy.increment();

    let gltfExists = false;
    const interval = setInterval(addToScene, 100);

    function addToScene () {
      if (that.gltf && !gltfExists) {
        gltfExists = true
      }

      if (gltfExists) {
        scene.add(that.gltf.scene);
        renderer.render(scene, camera);
        that.busy.decrement();
        clearInterval(interval)
      }
    }
    
  }
}
