import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevelopersEditComponent } from './developers-edit.component';

describe('DevelopersEditComponent', () => {
  let component: DevelopersEditComponent;
  let fixture: ComponentFixture<DevelopersEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevelopersEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevelopersEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
