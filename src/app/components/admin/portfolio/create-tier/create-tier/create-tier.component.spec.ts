import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTierComponent } from './create-tier.component';

describe('CreateTierComponent', () => {
  let component: CreateTierComponent;
  let fixture: ComponentFixture<CreateTierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
