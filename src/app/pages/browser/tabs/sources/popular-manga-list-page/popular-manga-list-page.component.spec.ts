import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularMangaListPageComponent } from './popular-manga-list-page.component';

describe('PopularMangaListPageComponent', () => {
  let component: PopularMangaListPageComponent;
  let fixture: ComponentFixture<PopularMangaListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopularMangaListPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularMangaListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
