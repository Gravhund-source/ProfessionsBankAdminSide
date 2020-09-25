import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Kunde } from '../Models/Kunde';

@Component({
  selector: 'app-dialog-box-kunde',
  templateUrl: './dialog-box-kunde.component.html',
  styleUrls: ['./dialog-box-kunde.component.css']
})
export class DialogBoxKundeComponent {
  action:any;
  local_data:any;

  constructor(public dialogRef: MatDialogRef<DialogBoxKundeComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Kunde) {
      this.local_data = {...data}; //local_data får data fra ...data som er fra admin-side componentet.
      this.action = this.local_data.action; //action fra objektet vil bliver kaldt, så den bliver kørt. 
    }

    doAction(){
      this.dialogRef.close({event:this.action,data:this.local_data}); //Vinduet bliver lukket, aktionen bliver kørt og den nye data bliver overført.
    }

    closeDialog(){
      this.dialogRef.close({event: 'Cancel'}); //Stopper actionen.
    }
}
