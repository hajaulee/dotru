import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestMangaListPageComponent } from './latest-manga-list-page.component';

describe('LatestMangaListPageComponent', () => {
  let component: LatestMangaListPageComponent;
  let fixture: ComponentFixture<LatestMangaListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LatestMangaListPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestMangaListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
