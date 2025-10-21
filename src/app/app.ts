import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListaTarefas } from './lista-tarefas/lista-tarefas';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ListaTarefas],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('lista-de-tarefas');
}
