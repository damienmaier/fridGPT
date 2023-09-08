import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastContent, ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-toasts',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit, OnDestroy {
  toasts: ToastContent[] = [];
  toastsSub!: Subscription;

  constructor(public toastService: ToastService) {}

  ngOnInit() {
    this.toastsSub = this.toastService.toastSubject.subscribe((newToasts: ToastContent[]) => this.toasts = newToasts)
  }

  ngOnDestroy() {
    if(this.toastsSub) {
      this.toastsSub.unsubscribe();
    }
  }
}
