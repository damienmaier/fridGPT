import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rotating-image',
  templateUrl: './rotating-image.component.html',
  styleUrls: ['./rotating-image.component.css']
})
/**
 * Child Component that's used to animate an image rotating (here, only gear images will rotate)
**/
export class RotatingImageComponent {
  @Input() goingFoward!: boolean; // which way the image is rotating
  @Input() imgSource!: string;
  @Input() imgWidth!: number;
}
