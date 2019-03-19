import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewpgComponent } from './viewpg.component';

describe('ViewpgComponent', () => {
  let component: ViewpgComponent;
  let fixture: ComponentFixture<ViewpgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewpgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewpgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
