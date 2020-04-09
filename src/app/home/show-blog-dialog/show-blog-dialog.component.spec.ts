import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowBlogDialogComponent } from './show-blog-dialog.component';

describe('ShowBlogDialogComponent', () => {
  let component: ShowBlogDialogComponent;
  let fixture: ComponentFixture<ShowBlogDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowBlogDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowBlogDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
