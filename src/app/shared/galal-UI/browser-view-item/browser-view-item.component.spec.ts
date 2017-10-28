import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserViewItemComponent } from './browser-view-item.component';

describe('BrowserViewItemComponent', () => {
  let component: BrowserViewItemComponent;
  let fixture: ComponentFixture<BrowserViewItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowserViewItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowserViewItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
