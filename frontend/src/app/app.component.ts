import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';

  data: any = {greetings: ""}

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('api/hello').subscribe(res => {
      this.data = res;
    });
  }
}
