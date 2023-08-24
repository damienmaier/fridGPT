import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-demo-page',
  templateUrl: './demo-page.component.html',
  styleUrls: ['./demo-page.component.css']
})
export class DemoPageComponent {
  data: any = {greetings: ""}

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('api/hello').subscribe(res => {
      this.data = res;
    });
  }
}
