import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CornerCoverComponent } from './corner-cover.component';

describe('CornerCoverComponent', () => {
  let component: CornerCoverComponent;
  let fixture: ComponentFixture<CornerCoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CornerCoverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CornerCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
