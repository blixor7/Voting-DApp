import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveAccountCardComponent } from './active-account-card.component';

describe('ActiveAccountCardComponent', () => {
  let component: ActiveAccountCardComponent;
  let fixture: ComponentFixture<ActiveAccountCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActiveAccountCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveAccountCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
