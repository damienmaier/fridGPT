import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * represents a Toast content
 */
export interface ToastContent {
  body: string;
  classNames: string;
}

/**
 * used to open toasts from anywhere in the app (mainly used to display errors)
 */
@Injectable()
export class ToastService {
  private toasts: ToastContent[]        = [];
  toastSubject: Subject<ToastContent[]> = new Subject<ToastContent[]>();

  /**
   * adds a toast to display and emits the updated toast list
   * @param body toast string content
   * @param classNames classes to apply to the toast
   */
  show(body: string, classNames: string): void {
    this.toasts.push({ body: body.replaceAll('\n', '<br>'), classNames });
    this.toastSubject.next(this.toasts.slice());
  }

  /**
   * removes a toast from the list and emits the updated toast list
   * @param toast toast to remove
   */
  remove(toast: ToastContent): void {
    this.toasts = this.toasts.filter(t => t.body != toast.body);
    this.toastSubject.next(this.toasts.slice());
  }
}