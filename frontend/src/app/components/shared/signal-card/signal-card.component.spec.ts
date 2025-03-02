import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalCardComponent } from './signal-card.component';

describe('SignalCardComponent', () => {
  let component: SignalCardComponent;
  let fixture: ComponentFixture<SignalCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignalCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
