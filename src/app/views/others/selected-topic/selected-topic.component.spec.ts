import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedTopicComponent } from './selected-topic.component';

describe('SelectedTopicComponent', () => {
  let component: SelectedTopicComponent;
  let fixture: ComponentFixture<SelectedTopicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectedTopicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
