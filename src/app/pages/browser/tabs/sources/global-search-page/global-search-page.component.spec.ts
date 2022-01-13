import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalSearchPageComponent } from './global-search-page.component';

describe('GlobalSearchPageComponent', () => {
  let component: GlobalSearchPageComponent;
  let fixture: ComponentFixture<GlobalSearchPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalSearchPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalSearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
