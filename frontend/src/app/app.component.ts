import { Component } from '@angular/core';
import { ToastService } from './services/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private toastService: ToastService) {}
  title:string = 'FridGPT';

  openCredits() {
    const credit = `Settings icons created by <a target="_blank" href="https://www.flaticon.com/free-icons/settings">Freepik-Flaticon</a><br>
    Image by jcomp on <a target="_blank" href="https://www.freepik.com/">Freepik-Flaticon</a>`
    this.toastService.show(credit,{ classname: 'bg-danger text-light'});
  }
}
