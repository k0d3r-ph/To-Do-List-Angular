import { Component } from '@angular/core';
import { MatDialogRef, MatDialogContent, MatDialogActions } from '@angular/material/dialog';

@Component({
  selector: 'app-pop-up',
  imports: [MatDialogContent, MatDialogActions],
  templateUrl: './pop-up.html',
  styleUrl: './pop-up.css',
})
export class PopUp {
  constructor(private dialogRef: MatDialogRef<PopUp>) {}

  fecharPopup() {
    this.dialogRef.close();
  }
}
