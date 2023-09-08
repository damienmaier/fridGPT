import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

export interface ToastContent {
  body: string;
  classNames: string;
}

@Injectable()
export class ToastService {
  private toasts: ToastContent[]        = [];
  toastSubject: Subject<ToastContent[]> = new Subject<ToastContent[]>();

  show(body: string, classNames: string): void {
    this.toasts.push({ body: body.replaceAll('\n', '<br>'),classNames });
    this.toastSubject.next(this.toasts.slice());
  }

  remove(toast: ToastContent): void {
    this.toasts = this.toasts.filter(t => t.body != toast.body);
    this.toastSubject.next(this.toasts.slice());
  }
}