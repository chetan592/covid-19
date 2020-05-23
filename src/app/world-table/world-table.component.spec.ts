import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldTableComponent } from './world-table.component';

describe('WorldTableComponent', () => {
  let component: WorldTableComponent;
  let fixture: ComponentFixture<WorldTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorldTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorldTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
