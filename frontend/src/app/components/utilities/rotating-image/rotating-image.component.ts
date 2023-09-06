import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rotating-image',
  templateUrl: './rotating-image.component.html',
  styleUrls: ['./rotating-image.component.css']
})
export class RotatingImageComponent {
  @Input() goingFoward!: boolean;
  @Input() imgSource!: string;
  @Input() imgWidth!: number;
}
