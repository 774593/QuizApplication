import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectExpertComponent } from './subject-expert.component';

describe('SubjectExpertComponent', () => {
  let component: SubjectExpertComponent;
  let fixture: ComponentFixture<SubjectExpertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubjectExpertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubjectExpertComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
