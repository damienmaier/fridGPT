import {TestBed} from '@angular/core/testing';
import {DemoComponent } from './demo.component';
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe('DemoComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    declarations: [DemoComponent]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(DemoComponent);
    const app     = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the frontend welcome message', () => {
    const fixture   = TestBed.createComponent(DemoComponent);
    fixture.detectChanges();
    const compiled  = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1#title')?.textContent).toContain('Welcome to FridGPT2 !');
  });
});
