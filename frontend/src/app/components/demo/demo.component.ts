import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent {
  data: any = {greetings: ""}

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('api/hello').subscribe(res => {
      this.data = res;
    });
  }
}
