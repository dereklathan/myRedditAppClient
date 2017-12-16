import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedditAccountComponent } from './reddit-account.component';

describe('RedditAccountComponent', () => {
  let component: RedditAccountComponent;
  let fixture: ComponentFixture<RedditAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedditAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedditAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
