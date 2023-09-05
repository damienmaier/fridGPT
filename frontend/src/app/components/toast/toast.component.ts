import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-toasts',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnDestroy {
  toasts: any[] = [];
  toastsSub!: Subscription;

  constructor(public toastService: ToastService) {}

  ngOnInit() {
    this.toastsSub = this.toastService.toastSubject.subscribe((newToasts: string[]) => this.toasts = newToasts)
  }

  ngOnDestroy() {
    if(this.toastsSub) {
      this.toastsSub.unsubscribe();
    }
  }
}
