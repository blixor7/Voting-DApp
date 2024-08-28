import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingTopicComponent } from './existing-topic.component';

describe('ExistingTopicComponent', () => {
  let component: ExistingTopicComponent;
  let fixture: ComponentFixture<ExistingTopicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExistingTopicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExistingTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
