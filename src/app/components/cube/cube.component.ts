import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cube',
  templateUrl: './cube.component.html',
  styleUrls: ['./cube.component.scss'],
})
export class CubeComponent implements OnInit {
  @Input() count: number;
  constructor() {}

  ngOnInit(): void {}
}
