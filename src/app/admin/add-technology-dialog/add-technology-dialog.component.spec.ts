import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTechnologyDialogComponent } from './add-technology-dialog.component';

describe('AddTechnologyDialogComponent', () => {
  let component: AddTechnologyDialogComponent;
  let fixture: ComponentFixture<AddTechnologyDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTechnologyDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTechnologyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
