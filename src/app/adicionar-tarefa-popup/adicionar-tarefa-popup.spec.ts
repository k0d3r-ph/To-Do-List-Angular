import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarTarefaPopup } from './adicionar-tarefa-popup';

describe('AdicionarTarefaPopup', () => {
  let component: AdicionarTarefaPopup;
  let fixture: ComponentFixture<AdicionarTarefaPopup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdicionarTarefaPopup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdicionarTarefaPopup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
