import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Job } from '../Models/Job';

@Component({
  selector: 'app-dialog-box-job',
  templateUrl: './dialog-box-job.component.html',
  styleUrls: ['./dialog-box-job.component.css']
})
export class DialogBoxJobComponent {
  action: any;
  local_data: any;

  constructor(public dialogRef: MatDialogRef<DialogBoxJobComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Job) {
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
