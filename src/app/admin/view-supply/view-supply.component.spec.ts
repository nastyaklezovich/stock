import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSupplyComponent } from './view-supply.component';

describe('ViewSupplyComponent', () => {
  let component: ViewSupplyComponent;
  let fixture: ComponentFixture<ViewSupplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSupplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSupplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
