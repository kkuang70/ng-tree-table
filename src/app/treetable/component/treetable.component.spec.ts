import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreetableComponent } from './treetable.component';

describe('TreetableComponent', () => {
  let component: TreetableComponent;
  let fixture: ComponentFixture<TreetableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreetableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
