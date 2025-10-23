import { Component, Inject, signal, OnInit, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';

@Component({
  selector: 'app-adicionar-tarefa-popup',
  imports: [FormsModule, MatDialogContent, MatDialogActions, MatDialogClose],
  templateUrl: './adicionar-tarefa-popup.html',
  styleUrl: './adicionar-tarefa-popup.css',
})
export class AdicionarTarefaPopup implements OnInit {
  ngOnInit(): void {
    this.textoTarefaSignal.set(this.data.textoInicial);
  }

  textoTarefaSignal = signal('');
  descricaoTarefaSignal = signal('');
  dataTarefaSignal = signal<string | null>(null);
  horaTarefaSignal = signal<string | null>(null);

  constructor(
    private dialogRef: MatDialogRef<AdicionarTarefaPopup>,

    @Inject(MAT_DIALOG_DATA) public data: { textoInicial: string }
  ) {}

  montarNovaTarefa() {
    const texto = this.textoTarefaSignal().trim();
    if (texto.length === 0) return;

    const descricao = this.descricaoTarefaSignal();
    const data = this.dataTarefaSignal();
    const hora = this.horaTarefaSignal();

    return {
      texto: texto,
      descricao: descricao,
      dataHora: data && hora ? new Date(`${data}T${hora}`) : null,
      concluida: false,
    };
  }

  @HostListener('document:keydown.enter', ['$event'])
  handleEnterPress(event: any): void {
    if (!(event instanceof KeyboardEvent)) return;

    const target = event.target as HTMLElement;
    if (target.tagName === 'TEXTAREA') return;

    event.preventDefault();
    this.salvar();
  }

  salvar() {
    const texto = this.textoTarefaSignal();
    const descricao = this.descricaoTarefaSignal();
    const dataString = this.dataTarefaSignal();
    const horaString = this.horaTarefaSignal();

    const novaTarefaObjeto = {
      texto,
      descricao,
      dataString: dataString,
      horaString: horaString,
      concluida: false,
    };

    this.dialogRef.close(novaTarefaObjeto);
  }
}
