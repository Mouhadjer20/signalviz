import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalGraphComponent } from './signal-graph.component';

describe('SignalGraphComponent', () => {
  let component: SignalGraphComponent;
  let fixture: ComponentFixture<SignalGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalGraphComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignalGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
