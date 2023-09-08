import {ComponentFixture, TestBed} from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ToastComponent } from './components/utilities/toast/toast.component';
import { createToastServiceSpy } from 'src/tests/fake-services';
import { ToastService } from './services/toast.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let fakeToastService: ToastService;
  
  beforeEach(async () => {
    fakeToastService = createToastServiceSpy();
    TestBed.configureTestingModule({
      imports: [AppRoutingModule],
      declarations: [AppComponent, ToastComponent],
      providers: [
        {provide: ToastService, useValue: fakeToastService}
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture     = TestBed.createComponent(AppComponent);
    component   = fixture.componentInstance;
    fixture.detectChanges();
  });

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
