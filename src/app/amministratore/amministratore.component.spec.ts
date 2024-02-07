import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmministratoreComponent } from './amministratore.component';

describe('AmministratoreComponent', () => {
  let component: AmministratoreComponent;
  let fixture: ComponentFixture<AmministratoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AmministratoreComponent]
    });
    fixture = TestBed.createComponent(AmministratoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
