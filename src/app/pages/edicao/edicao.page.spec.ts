import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EdicaoPage } from './edicao.page';

describe('EdicaoPage', () => {
  let component: EdicaoPage;
  let fixture: ComponentFixture<EdicaoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EdicaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
