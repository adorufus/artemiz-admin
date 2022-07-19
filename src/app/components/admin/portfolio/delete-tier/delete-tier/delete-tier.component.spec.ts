import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTierComponent } from './delete-tier.component';

describe('DeleteTierComponent', () => {
  let component: DeleteTierComponent;
  let fixture: ComponentFixture<DeleteTierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteTierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
