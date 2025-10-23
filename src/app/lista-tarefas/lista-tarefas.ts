import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopUp } from '../pop-up/pop-up';
import { AdicionarTarefaPopup } from '../adicionar-tarefa-popup/adicionar-tarefa-popup';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-lista-tarefas',
  imports: [PopUp, DatePipe],
  templateUrl: './lista-tarefas.html',
  styleUrl: './lista-tarefas.css',
})
export class ListaTarefas {
  @ViewChild('input') inputElement!: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    const dadosSalvos = localStorage.getItem('lista');

    if (dadosSalvos) {
      const listaDoStorage = JSON.parse(dadosSalvos);

      this.tarefas = listaDoStorage.map((tarefa: any) => ({
        texto: tarefa.texto,
        concluida: tarefa.concluida,
        descricao: tarefa.descricao,
        dataString: tarefa.dataString ?? null,
        horaString: tarefa.horaString ?? null,
      }));
    }
  }

  constructor(private dialog: MatDialog) {}

  @HostListener('document:keydown.enter', ['$event'])
  handleEnterPress(event: Event) {
    const keyboardEvent = event as KeyboardEvent;

    if (!keyboardEvent || keyboardEvent.key !== 'Enter') return;

    if (document.activeElement?.closest('mat-dialog-container')) return;

    const valor = this.inputElement?.nativeElement.value.trim();
    if (valor && valor.length > 0) {
      this.abrirPopupAdicionar(valor);
    }
  }

  mostrarPopup: boolean = false;

  tarefas: {
    texto: string;
    concluida: boolean;
    descricao: string;
    dataString: string | null;
    horaString: string | null;
    dataHora: Date | null;
  }[] = [];

  adicionarTarefa(novaTarefa: {
    texto: string;
    concluida: boolean;
    descricao: string;
    dataString: string | null;
    horaString: string | null;
    dataHora?: Date | null;
  }) {
    if (!novaTarefa.texto || novaTarefa.texto.trim().length === 0) {
      return;
    }

    if (
      this.tarefas.some((tarefa) => tarefa.texto.toLowerCase() === novaTarefa.texto.toLowerCase())
    ) {
      this.mostrarPopup = true;
      this.dialog.open(PopUp);
      return;
    }

    let dataHoraFormatada: Date | null = null;
    if (novaTarefa.dataString && novaTarefa.horaString) {
      dataHoraFormatada = new Date(`${novaTarefa.dataString}T${novaTarefa.horaString}`);
    }

    this.tarefas.push({
      texto: novaTarefa.texto,
      descricao: novaTarefa.descricao,
      concluida: novaTarefa.concluida,
      dataString: novaTarefa.dataString,
      horaString: novaTarefa.horaString,
      dataHora: dataHoraFormatada,
    });

    this.salvarTarefas();
  }

  abrirPopupAdicionar(valorInput: string) {
    const textoDigitado = valorInput.trim();
    if (textoDigitado.length === 0) return;

    const dialogRef = this.dialog.open(AdicionarTarefaPopup, {
      data: { textoInicial: textoDigitado },
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        this.adicionarTarefa(resultado);
      }

      this.inputElement.nativeElement.value = '';
    });
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
