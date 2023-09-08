import { Component } from '@angular/core';
import { ToastService } from './services/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private toastService: ToastService) {}
  title = 'FridGPT';

  openCredits() {
    const credit = `Settings icons created by <a target="_blank" href="https://www.flaticon.com/free-icons/settings">Freepik-Flaticon</a><br>
    Image by jcomp on <a target="_blank" href="https://www.freepik.com/">Freepik-Flaticon</a>
    <br> loading song : Aperture Science Psychoacoustic Laboratories -
    <a target="_blank" href="https://downloads.khinsider.com/game-soundtracks/album/portal-2-soundtrack-songs-to-test-by-collectors-edition/1-19%2520-%2520Turret%2520Wife%2520Serenade.mp3">turret wife serenade</a>`
    this.toastService.show(credit,'bg-danger text-light');
  }
}
