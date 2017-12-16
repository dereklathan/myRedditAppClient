import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedditAccountDeletedComponent } from './reddit-account-deleted.component';

describe('RedditAccountDeletedComponent', () => {
  let component: RedditAccountDeletedComponent;
  let fixture: ComponentFixture<RedditAccountDeletedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedditAccountDeletedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedditAccountDeletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
