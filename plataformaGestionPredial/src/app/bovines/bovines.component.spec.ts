import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BovinesComponent } from './bovines.component';

describe('BovinesComponent', () => {
  let component: BovinesComponent;
  let fixture: ComponentFixture<BovinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BovinesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BovinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
