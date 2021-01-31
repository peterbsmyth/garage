import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-cube',
  templateUrl: './cube.component.html',
  styleUrls: ['./cube.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CubeComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas') canvasEl: ElementRef;
  @Input() renderer;
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.canvasEl.nativeElement.appendChild(this.renderer.domElement);
  }
  
}
