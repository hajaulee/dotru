import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtensionCardComponent } from './extension-card.component';

describe('ExtensionCardComponent', () => {
  let component: ExtensionCardComponent;
  let fixture: ComponentFixture<ExtensionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtensionCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtensionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
