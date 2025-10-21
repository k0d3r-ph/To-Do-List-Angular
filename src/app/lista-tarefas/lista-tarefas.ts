import { Component } from '@angular/core';

@Component({
  selector: 'app-lista-tarefas',
  imports: [],
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

  tarefas: string[] = [];

  adicionarTarefa(novaTarefa: string) {
    this.tarefas.push(novaTarefa);
    let textoDasTarefas = JSON.stringify(this.tarefas);
    localStorage.setItem('lista', textoDasTarefas);
  }
}
