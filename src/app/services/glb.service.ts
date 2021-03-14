import { Injectable } from '@angular/core';
import { AmbientLight, PointLight } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

@Injectable({
  providedIn: 'root',
})
export class GlbService {
  private gltf;
  private loader;

  constructor() {
    this.loader = new GLTFLoader();
    // const dracoLoader = new DRACOLoader();
    // dracoLoader.setDecoderPath('/examples/js/libs/draco/');
    // this.loader.setDRACOLoader(dracoLoader);
    this.loader.load(
      'https://wyatts-garage.s3.us-east-2.amazonaws.com/garage.glb',
      (gltf) => {
        console.log(gltf);
        this.gltf = gltf;
      },
      () => {},
      (err) => console.error(err)
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
