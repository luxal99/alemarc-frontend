import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgShowDialogComponent } from './img-show-dialog.component';

describe('ImgShowDialogComponent', () => {
  let component: ImgShowDialogComponent;
  let fixture: ComponentFixture<ImgShowDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImgShowDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgShowDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
