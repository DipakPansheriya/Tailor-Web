import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatternMasterComponent } from './pattern-master.component';

describe('PatternMasterComponent', () => {
  let component: PatternMasterComponent;
  let fixture: ComponentFixture<PatternMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatternMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatternMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
