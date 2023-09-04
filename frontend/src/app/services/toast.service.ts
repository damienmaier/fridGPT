import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class ToastService {
  private toasts: string[]        = [];
  toastSubject: Subject<string[]> = new Subject<string[]>();

  show(body: string) {
    this.toasts.push(body);
    this.toastSubject.next(this.toasts.slice());
  }

  remove(toast: string) {
    this.toasts = this.toasts.filter(t => t != toast);
    this.toastSubject.next(this.toasts.slice());
  }
}