import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuiztitleComponent } from './quiztitle.component';

describe('QuiztitleComponent', () => {
  let component: QuiztitleComponent;
  let fixture: ComponentFixture<QuiztitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuiztitleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuiztitleComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
