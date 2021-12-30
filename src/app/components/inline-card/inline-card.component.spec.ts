import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineCardComponent } from './inline-card.component';

describe('InlineCardComponent', () => {
  let component: InlineCardComponent;
  let fixture: ComponentFixture<InlineCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InlineCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InlineCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
