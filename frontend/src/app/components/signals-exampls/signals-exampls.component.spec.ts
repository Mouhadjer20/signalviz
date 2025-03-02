import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalsExamplsComponent } from './signals-exampls.component';

describe('SignalsExamplsComponent', () => {
  let component: SignalsExamplsComponent;
  let fixture: ComponentFixture<SignalsExamplsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalsExamplsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignalsExamplsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
