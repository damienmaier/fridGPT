import {TestBed} from '@angular/core/testing';
import {DemoPageComponent } from './demo-page.component';
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe('DemoPageComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    declarations: [DemoPageComponent]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(DemoPageComponent);
    const app     = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the frontend welcome message', () => {
    const fixture   = TestBed.createComponent(DemoPageComponent);
    fixture.detectChanges();
    const compiled  = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1#title')?.textContent).toContain('Welcome to FridGPT2 !');
  });
});
