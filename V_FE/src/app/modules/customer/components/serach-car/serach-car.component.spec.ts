import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SerachCarComponent } from './serach-car.component';

describe('SerachCarComponent', () => {
  let component: SerachCarComponent;
  let fixture: ComponentFixture<SerachCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SerachCarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SerachCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
