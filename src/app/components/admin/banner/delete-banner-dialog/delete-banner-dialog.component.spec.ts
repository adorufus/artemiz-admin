import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBannerDialogComponent } from './delete-banner-dialog.component';

describe('DeleteBannerDialogComponent', () => {
  let component: DeleteBannerDialogComponent;
  let fixture: ComponentFixture<DeleteBannerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteBannerDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteBannerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
