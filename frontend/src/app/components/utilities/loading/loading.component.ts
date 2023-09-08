import { Component, OnDestroy, OnInit } from '@angular/core';
import * as Howler from 'howler';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
/**
 * Component that will be displayed during the recipes generation, is used as a loading screen
**/
export class LoadingComponent implements OnInit, OnDestroy {
  private audio!: Howler.Howl;

  ngOnInit(): void {
    this.audio = new Howler.Howl({ src: ['/assets_app/loading_song.mp3'], autoplay: false, loop: true, volume: 1 });
  }

  playing(): boolean {
    return this.audio && this.audio.playing();
  }

  /**
   * is triggered when we click on the sleeping fridge icon, starts the music
   */
  wakeUp(): void {
    this.audio.play();
  }

  /**
   * is triggered when we click on the singing fridge icon, stops the music
   */
  goToSleep(): void {
    this.audio.pause();
  }

  ngOnDestroy(): void {
    this.audio.stop();
  }
}
