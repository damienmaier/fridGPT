import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingComponent } from './loading.component';
import { RotatingImageComponent } from '../rotating-image/rotating-image.component';
import { click, findElement } from 'src/tests/main.test-helper';

describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoadingComponent, RotatingImageComponent]
    });
    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('the fridge should be sleeping at first', () => {
    expect(findElement(fixture, 'sleeping')).toBeTruthy();
    try {
      findElement(fixture, 'singing');
    } catch(e: any) {
      expect(e.message).toBe("the given id is not linked to any element in the template");
    }
  });

  it('clicking on the sleeping fridge should change the image and play music', () => {
    click(fixture, 'sleeping');
    fixture.whenStable().then(() => {
      expect(component.playing()).toBeTruthy();
      expect(findElement(fixture, 'singing')).toBeTruthy();
    })
  });

  it('clicking on the singing fridge should change the image and stop the music', () => {
    click(fixture, 'sleeping');
    fixture.whenStable().then(() => {
      click(fixture, 'singing');
      fixture.whenStable().then(() => {
        expect(component.playing()).not.toBeTruthy();
      expect(findElement(fixture, 'sleeping')).toBeTruthy();
      })
    })
  });
});
