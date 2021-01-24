import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-cube',
  templateUrl: './cube.component.html',
  styleUrls: ['./cube.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CubeComponent implements OnInit {
  @Input() count: number;
  constructor() {}

  ngOnInit(): void {}
}
