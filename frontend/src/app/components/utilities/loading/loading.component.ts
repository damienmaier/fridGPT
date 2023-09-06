import { Component } from '@angular/core';
import * as Howler from 'howler';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent {
  private audio!: Howler.Howl;
  constructor() {}

  ngOnInit() {
    this.audio = new Howler.Howl({
      src: ['/assets_app/loading_song.mp3'],
      autoplay: false,
      loop: true,
      volume: 1
    });
  }

  playing() {
    return this.audio && this.audio.playing();
  }

  wakeUp() {
    this.audio.play();
  }

  goToSleep() {
    this.audio.pause();
  }

  ngOnDestroy() {
    this.audio.stop();
  }
}
