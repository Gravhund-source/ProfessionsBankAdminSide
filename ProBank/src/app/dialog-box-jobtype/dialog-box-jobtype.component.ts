import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Arbejdstype } from '../Models/Arbejdstype';

@Component({
  selector: 'app-dialog-box-jobtype',
  templateUrl: './dialog-box-jobtype.component.html',
  styleUrls: ['./dialog-box-jobtype.component.css']
})
export class DialogBoxJobtypeComponent {
  action:any;
  local_data:any;

  constructor(public dialogRef: MatDialogRef<DialogBoxJobtypeComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Arbejdstype) {
      console.log(data);
      this.local_data = {...data};
      this.action = this.local_data.action;
    }

    doAction(){
      this.dialogRef.close({event:this.action,data:this.local_data});
    }

    closeDialog(){
      this.dialogRef.close({event: 'Cancel'});
    }

}
