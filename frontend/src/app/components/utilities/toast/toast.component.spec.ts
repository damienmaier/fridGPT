import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastComponent } from './toast.component';
import { ToastService } from 'src/app/services/toast.service';
import { createToastServiceSpy } from 'src/tests/fake-services';

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;
  let fakeToastService: ToastService;

  beforeEach(async () => {
    fakeToastService = createToastServiceSpy();
    TestBed.configureTestingModule({
      declarations: [ToastComponent],
      providers:    [
        {provide: ToastService, useValue: fakeToastService}
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture    = TestBed.createComponent(ToastComponent);
    component  = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
