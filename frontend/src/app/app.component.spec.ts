import {TestBed} from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [AppRoutingModule],
    declarations: [AppComponent]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app     = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'FridGPT'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app     = fixture.componentInstance;
    expect(app.title).toEqual('FridGPT');
  });
});
