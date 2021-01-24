import { Component, OnInit } from '@angular/core';
import { ThreeService } from 'src/app/services/three.service';

@Component({
  templateUrl: './garage.page.html',
  styleUrls: ['./garage.page.scss'],
})
export class GaragePage implements OnInit {
  constructor(public three: ThreeService) {}

  ngOnInit(): void {}

  /**
   * based on user keypress...
   * W A S D manipulate the camera
   * up down left right manipulate the cube
   */
}
