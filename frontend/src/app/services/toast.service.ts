import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class ToastService {
  private toasts: any[]        = [];
  toastSubject: Subject<any[]> = new Subject<any[]>();

  show(body: string, options: any = {}): void {
    this.toasts.push({ body: body.replaceAll('\n', '<br>'), ...options });
    this.toastSubject.next(this.toasts.slice());
  }

  remove(toast: string): void {
    this.toasts = this.toasts.filter(t => t != toast);
    this.toastSubject.next(this.toasts.slice());
  }
}