import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Filer } from '../Models/Filer';

@Component({
  selector: 'app-dialog-box-filer',
  templateUrl: './dialog-box-filer.component.html',
  styleUrls: ['./dialog-box-filer.component.css']
})
export class DialogBoxFilerComponent {
  action: any;
  local_data: any;

  constructor(public dialogRef: MatDialogRef<DialogBoxFilerComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Filer) {
    console.log(data);
    this.local_data = { ...data };
    this.action = this.local_data.action;
  }

  doAction() {
    this.dialogRef.close({ event: this.action, data: this.local_data });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }

}
