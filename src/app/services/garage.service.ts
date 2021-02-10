import { Injectable } from '@angular/core';
import { AmbientLight, PointLight } from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

@Injectable({
  providedIn: 'root',
})
export class ObjService {
  private garage;
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

  public init(scene, camera?, renderer?): void {
    const ambientLight = new AmbientLight(0xcccccc, 0.4);
    scene.add(ambientLight);

    const pointLight = new PointLight(0xffffff, 0.8);
    camera.add(pointLight);

    setTimeout(() => {
      scene.add(this.garage);
      renderer.render(scene, camera);
    }, 2000);
  }
}
