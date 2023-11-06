import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedecinComponentComponent } from './medecin-component.component';

describe('MedecinComponentComponent', () => {
  let component: MedecinComponentComponent;
  let fixture: ComponentFixture<MedecinComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedecinComponentComponent]
    });
    fixture = TestBed.createComponent(MedecinComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
