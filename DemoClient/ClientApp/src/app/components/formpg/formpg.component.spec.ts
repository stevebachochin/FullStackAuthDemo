import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormpgComponent } from './formpg.component';

describe('FormpgComponent', () => {
  let component: FormpgComponent;
  let fixture: ComponentFixture<FormpgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormpgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormpgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
