import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockFaceComponent } from './clock-face.component';

describe('ClockFaceComponent', () => {
  let component: ClockFaceComponent;
  let fixture: ComponentFixture<ClockFaceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClockFaceComponent]
    });
    fixture = TestBed.createComponent(ClockFaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
