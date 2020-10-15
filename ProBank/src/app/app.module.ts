import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule} from '@angular/material/input';
import { MatTableModule } from '@angular/material/table'; 
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';

import { HttpClientModule } from '@angular/common/http';
import { SignInComponent } from './Login/sign-in/sign-in.component';
import { AdminSideComponent } from './Admin/admin-side/admin-side.component';
import { DialogBoxJobtypeComponent } from './dialog-box-jobtype/dialog-box-jobtype.component';
import { DialogBoxJobComponent } from './dialog-box-job/dialog-box-job.component';
import { DialogBoxFilerComponent } from './dialog-box-filer/dialog-box-filer.component';
import { DialogBoxKundeComponent } from './dialog-box-kunde/dialog-box-kunde.component';
import { AuthGuard } from './auth.guard';
import { DialogBoxKundejobComponent } from './dialog-box-kundejob/dialog-box-kundejob.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    AdminSideComponent,
    DialogBoxJobtypeComponent,
    DialogBoxJobComponent,
    DialogBoxFilerComponent,
    DialogBoxKundeComponent,
    DialogBoxKundejobComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
    MatPaginatorModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
