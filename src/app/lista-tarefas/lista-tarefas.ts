import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopUp } from '../pop-up/pop-up';

@Component({
  selector: 'app-lista-tarefas',
  imports: [PopUp],
  templateUrl: './lista-tarefas.html',
  styleUrl: './lista-tarefas.css',
})
export class ListaTarefas {
  ngOnInit(): void {
    const dadosSalvos = localStorage.getItem('lista');

    if (dadosSalvos) {
      const lista = JSON.parse(dadosSalvos);
      this.tarefas = lista;
    }
  }

  constructor(private dialog: MatDialog) {}

  mostrarPopup: boolean = false;

  tarefas: { texto: string; concluida: boolean }[] = [];

  adicionarTarefa(novaTarefa: string) {
    if (novaTarefa.trim().length === 0) {
      return;
    }

    const novaTarefaObjeto = {
      texto: novaTarefa,
      concluida: false,
    };

    if (this.tarefas.some((tarefa) => tarefa.texto === novaTarefa)) {
      this.mostrarPopup = true;
      this.dialog.open(PopUp);
      return;
    }

    this.tarefas.push(novaTarefaObjeto);

    this.salvarTarefas();
  }

  salvarTarefas() {
    localStorage.setItem('lista', JSON.stringify(this.tarefas));
  }

  deletarTarefa(indice: number) {
    this.tarefas.splice(indice, 1);
    let textoDasTarefas = JSON.stringify(this.tarefas);
    localStorage.setItem('lista', textoDasTarefas);
  }

  concluirTarefa(indice: number) {
    let tarefa = this.tarefas[indice];
    tarefa.concluida = !tarefa.concluida;
    this.salvarTarefas();
  }

  fecharPopup() {
    this.dialog.closeAll();
  }
}
