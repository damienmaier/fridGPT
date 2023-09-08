import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rotating-image',
  templateUrl: './rotating-image.component.html',
  styleUrls: ['./rotating-image.component.css']
})
/**
 * Component that's used to animate a rotating image (here, only gear images will rotate)
**/
export class RotatingImageComponent {
  @Input() goingFoward!: boolean; // which way the image is rotating
  @Input() imgSource!: string;
  @Input() imgWidth!: number;
}
