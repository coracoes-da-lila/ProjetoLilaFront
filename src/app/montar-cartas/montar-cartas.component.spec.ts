import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MontarCartasComponent } from './montar-cartas.component';

describe('MontarCartasComponent', () => {
  let component: MontarCartasComponent;
  let fixture: ComponentFixture<MontarCartasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MontarCartasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MontarCartasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
