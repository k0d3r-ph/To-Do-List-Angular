import { Component, Inject, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogContent } from '@angular/material/dialog';

@Component({
  selector: 'app-adicionar-tarefa-popup',
  imports: [FormsModule, MatDialogContent],
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
