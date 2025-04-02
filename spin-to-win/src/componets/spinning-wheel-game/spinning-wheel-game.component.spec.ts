import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinningWheelGameComponent } from './spinning-wheel-game.component';

describe('SpinningWheelGameComponent', () => {
  let component: SpinningWheelGameComponent;
  let fixture: ComponentFixture<SpinningWheelGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinningWheelGameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpinningWheelGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
