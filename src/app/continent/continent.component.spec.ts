import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContinentComponent } from './continent.component';

describe('ContinentComponent', () => {
  let component: ContinentComponent;
  let fixture: ComponentFixture<ContinentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContinentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContinentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
