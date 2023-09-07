import { Component } from '@angular/core';
import * as Howler from 'howler';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
/**
 * Component that will be displayed during the recipes generation, is used as a loading screen
**/
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

  /**
   * is triggered when we click on the sleeping fridge icon, starts the music
   */
  wakeUp() {
    this.audio.play();
  }

  /**
   * is triggered when we click on the singing fridge icon, stops the music
   */
  goToSleep() {
    this.audio.pause();
  }

  ngOnDestroy() {
    this.audio.stop();
  }
}
