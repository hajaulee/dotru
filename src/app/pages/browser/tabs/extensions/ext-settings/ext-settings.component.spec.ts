import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtSettingsComponent } from './ext-settings.component';

describe('ExtSettingsComponent', () => {
  let component: ExtSettingsComponent;
  let fixture: ComponentFixture<ExtSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
