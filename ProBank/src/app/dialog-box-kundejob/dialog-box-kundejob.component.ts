import { Inject, Optional } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Filer } from '../Models/Filer';

@Component({
  selector: 'app-dialog-box-kundejob',
  templateUrl: './dialog-box-kundejob.component.html',
  styleUrls: ['./dialog-box-kundejob.component.css']
})
export class DialogBoxKundejobComponent {
  action: any;
  local_data: any;

  constructor(public dialogRef: MatDialogRef<DialogBoxKundejobComponent>,
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
