import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadMoreDescriptionComponent } from './read-more-description.component';

describe('ReadMoreDescriptionComponent', () => {
  let component: ReadMoreDescriptionComponent;
  let fixture: ComponentFixture<ReadMoreDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadMoreDescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadMoreDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
