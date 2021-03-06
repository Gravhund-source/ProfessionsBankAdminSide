import { Component, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { Router } from '@angular/router';
import { HttpService } from '../../Service/http.service';
import { Kunde } from 'src/app/Models/Kunde';
import { Arbejdstype } from 'src/app/Models/Arbejdstype';
import { Filer } from 'src/app/Models/Filer';
import { Job } from 'src/app/Models/Job';
import { DialogBoxKundeComponent } from 'src/app/dialog-box-kunde/dialog-box-kunde.component';
import { DialogBoxJobtypeComponent } from 'src/app/dialog-box-jobtype/dialog-box-jobtype.component';
import { DialogBoxFilerComponent } from 'src/app/dialog-box-filer/dialog-box-filer.component';
import { DialogBoxJobComponent } from 'src/app/dialog-box-job/dialog-box-job.component';
import { SignInComponent} from 'src/app/Login/sign-in/sign-in.component';
import { switchMap, tap } from 'rxjs/operators';
import { DialogBoxKundejobComponent } from 'src/app/dialog-box-kundejob/dialog-box-kundejob.component';

@Component({
  selector: 'app-admin-side',
  templateUrl: './admin-side.component.html',
  styleUrls: ['./admin-side.component.css']
})
export class AdminSideComponent implements OnInit {
  //#region (KS) Models, MatTable-dataSource og DisplayColumns
  /*
                                          ---     KOMMENTAR SEKTION     ---     
    MODELS OBJEKTER
    Der laves et objekt for hvert model, modellerne repræsentere Tabellerne fra databasen.
    forklaring på brug af objekter: model = new Model; er et almendeligt objekt, 
    man kan hidkalde data fra modellen ved at skrive eks.(modelNavn.variableNavn).
    En anden type af objekt er array objektet: model : model[]; dette objekt kan bruges til at hente alle data´erne fra modellen,
    dette betyder at man som eks. kan lave et objekt med op flere data typer som kan opdater på en gang i stedet for en af gangen.

    MAT-TABLE-DATASOURCE
    MatTableDataSource gør så at man kan indsætte data´er i material design tabellen. Eksempel: DataSource : MatTableDataSource<Kunde>; 
    tabellen.

    DISPLAYCOLUMNS
    DisplayColumns bruges til at give tabellen et id til kollonerne 

  */
  //#endregion

  arbejdstype = new Arbejdstype; //arbejdstype er et objekt af modellen Arbejdstype.
  arbejdstyper: Arbejdstype[]; //arbejdstyper er et array objekt af modellen Arbejdstype.
  kunde = new Kunde;
  kunder: Kunde[];
  file = new Filer;
  filer: Filer[];
  job = new Job;
  jobs: Job[];

  Sign: SignInComponent; //Sign er et objekt af componentet SignInComponent. 

  dataSourceJ: MatTableDataSource<Job>; //dataSourceJ er et objekt af Datatable Datasource, som har tager udgangspunkt i en model. 
  dataSourceJT: MatTableDataSource<Arbejdstype>;
  dataSourceF: MatTableDataSource<Filer>;
  dataSource: MatTableDataSource<Kunde>;
/*   dataSourceKJ: MatTableDataSource<[Kunde, Job]>; */

  displayedColumns = ['fornavn', 'efternavn', 'proStatus', 'sendtAnsoegning', 'godkendtArb01', 'godkendtArb02', 'godkendtArb03', 'action'];
  displayedColumnsJT = ['arbejdstype1', 'arbejdstypeBeskrivelse', 'action'];
  displayedColumnsJ = ['arbejdstype', 'jobOverskrift', 'jobBeskrivelse', 'jobStartTidspunkt', 'jobSlutTidspunkt', 'action'];
  displayedColumnsF = ['dokumentationLink', 'billedeLink', 'action']; //'Fornavn',
  /* displayedColumnsKJ = ['arbejdstype', 'jobOverskrift', 'jobBeskrivelse', 'jobStartTidspunkt', 'jobSlutTidspunkt', 'kundeID', 'kundeProID', 'action']; */

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  //#region (KS) Constructor og Get
  /*
                                      ---     KOMMENTAR SEKTION     ---     
      CONSTRUCTOR
      
      GET
  
  */
  //#endregion
  constructor(private httpService: HttpService, public dialog: MatDialog, private router: Router) {
    this.httpService.getKunde().subscribe((kunde) => { //HttpServices Getkunde Bliver kaldt og kunde parameteren bliver lavet.
      this.dataSource = new MatTableDataSource(kunde); //DataSource får data fra DataTableSource som er forbundet til getkunde.
    })

    this.httpService.getJob().subscribe((job) => {
      this.dataSourceJ = new MatTableDataSource(job);
    })

    this.httpService.getFiler().subscribe((filer) => {
      this.dataSourceF = new MatTableDataSource(filer);
    })
    
    this.httpService.getArbejdstype().subscribe((jobtype) => {
      this.dataSourceJT = new MatTableDataSource(jobtype);
    })

     /* this.httpService.getKundeJob().subscribe((kundejob) => {
      this.dataSourceKJ = new MatTableDataSource([kundejob]);
    }) */ 
  }
  ngOnInit() {
  }
  OnLoggedOut(){
    localStorage.removeItem('IsLoggedIn') //fjerner IsLoggedIn fra storage, så man ikke kan komme ind.
    this.router.navigate(['login']); // bruger bliver sendt tilbage til login.
  }
  //#region (KS) OpenDialog, addRowDataType, updateRowData og deleteRowData
  /*
                                          ---     KOMMENTAR SEKTION     ---     
      OPENDIALOG
      OpenDialog bruges til at vælge i mellem hvilken aktion man ønsker at tage.
      
      ADDROWDATA
      Addrowdata tager data fra DataTabellen i admin-side.component.html´en, hvor data´en bliver skrevet ind
      og sendt ind efter knappen (indsæt) bliver trykket. forklaring: this.dataSourceJT.data.push 
      gør så at data fra tabellen bliver sat ind
  
      UPDATEROWDATA
      this.kunder = dataSource.data.filter((value, key) =>) { (CODE BITE)
      Array´et kunder får værdier fra dataSource ved at udspecificer at det er .data (data´en fra tabellen)
      
      if (value.kundeId == row_obj.kundeId) { (CODE BITE)
      Der laves et if statement for at sammenligne kunde id´et med den udvalgte række værdi.
      
      value.kundeId = row_obj.kundeId; (CODE BITE)
      value.godkendtArb01 = parseInt(row_obj.godkendtArb01); (CODE BITE)
      delete value["action"]; (CODE BITE)
      Inde i if´en bliver objekt data fra modellen sammenlignet med row_obj. objekt data, så den værdi i tabellen bliver overført til model objektet inde i metoden.
      nogle af objekterne skal parses som ints, da input bliver set som en string variable, man skal også slette værdien delete da den bliver set som 
      et objekt.

      return this.httpService.updateKunde(value.kundeId, value).subscribe(); (CODE BITE)
      Til sidst retuneres update inde i httpservice, med kunde id´et fra parameteret values. 
  
      DELETEROWDATA
      this.kunder = dataSource.data.filter((kundeObj) => (CODE BITE)
      Den får at vide hvilken model og datatabel den skal sammenligne data´erne med, herefter laves et filter for at udvælge kunde modellen specifikt.

      kunObj.KundeId!== row_Obj.kundeId (CODE BITE)
      Der sikres her at det er specifikt denne id (row_obj.kundeId dens id) og ikke en anden id.

      this.httpService.deleteKunde(row_Obj.kundeId).subscribe()); (CODE BITE)
      Vi hidkalder servicen, httpService, fortæller den at det er deletekunde metoden som ønskes at blive brugt.
      Den får en værdi krævet for at vide hvilken kunde det er der skal slettes.
  */
  //#endregion
  //#region OpenDialog
  openDialogType(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxJobtypeComponent, { //dialogRef er dialogboxjobtype som er lavet om til et vindue.
      width: '600px', //Der gives en bredde og højde til dialogen vinduet, hvis de ikke bliver angivet så vil den ikke blive vist ordenligt.
      height: '600px',
      data: obj //Data : obj er for at fortælle programmet at i DialogBoxKundeComponent at dens objekt data henter data fra admin-sides obj.
    });
    dialogRef.afterClosed().subscribe(result => { //
      if (result.event == 'Add') {
        this.addRowDataType(result.data);
      }
      else if (result.event == 'Update') { //Hvis knapperne i htmlen med eks.(openDialogType) i sig vil tage køre den operation som den har af værdi. eks. knappen med 'Update' i sig Vil blive sammenlignet her og kører update funktionen.
        this.updateRowDataType(result.data); //UpdateRowData metoden vil blive åbnet, i dens parameter vil være lig med den i metoden.
      }
      else if (result.event == 'Delete') {
        this.deleteRowDataType(result.data);
      }
    });
  }
  addRowDataType(row_obj) {
    const typeToAdd = { //Der laves en const med info som bliver givet videre til httpservicen.
      arbejdstypeId: row_obj.arbejdstypeId, //Giv consten hver en af modellens variable navne og giv dem typen af row_obj 
      arbejdstype1: row_obj.arbejdstype1,
      arbejdstypeBeskrivelse: row_obj.arbejdstypeBeskrivelse
    }
    this.httpService.postArbejdstype(typeToAdd).subscribe((TypeAdded) => { this.dataSourceJT.data.push(TypeAdded) } // post kalder httpservice, med TypeToAdd consten som bliver tilføjet i dens paramter. 
    // dataen indsættes ind i datatabelen og ind i databasen.
    );

  }
  updateRowDataType(row_obj) {
    this.arbejdstyper = this.dataSourceJT.data.filter((value, key) => {
      if (value.arbejdstypeId == row_obj.arbejdstypeId) {
        value.arbejdstypeId = row_obj.arbejdstypeId;
        value.arbejdstype1 = row_obj.arbejdstype1;
        value.arbejdstypeBeskrivelse = row_obj.arbejdstypeBeskrivelse;
        delete value["action"];
        console.log(row_obj.arbejdstypeId)
        return this.httpService.updateArbejdstype(value.arbejdstypeId, value).subscribe();
      }
    });
  }
  deleteRowDataType(row_obj) {
    this.arbejdstyper = this.dataSourceJT.data.filter((arbObj) =>
      arbObj.arbejdstypeId !== row_obj.arbejdstypeId, this.httpService.deleteArbejdstype(row_obj.arbejdstypeId).subscribe());
    console.log(row_obj.arbejdstypeId);
    return true;
  }

  openDialogKunde(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxKundeComponent, { 
      width: '600px', 
      height: '600px',
      data: obj  
    });
    dialogRef.afterClosed().subscribe(result => { 
      if (result.event == 'Update') { 
        this.updateRowData(result.data);  
      }
      else if (result.event == 'Delete') {
        this.deleteRowData(result.data);
      }
    });
  }
  updateRowData(row_obj) {
    this.kunder = this.dataSource.data.filter((value, key) => { //Array´et kunder får værdier fra dataSource ved at udspecificer at det er .data (data´en fra tabellen)
      if (value.kundeId == row_obj.kundeId) {
        value.kundeId = row_obj.kundeId;
        value.proStatus = row_obj.proStatus; //Kunde objekt får data fra row_obj objekt og dens dataer, så den værdi i tabellen bliver overført til model objektet inde i metoden.
        value.fornavn = row_obj.fornavn;
        value.efternavn = row_obj.efternavn;
        value.email = row_obj.email;
        value.dob = row_obj.dob;
        value.profilTekst = row_obj.profilTekst;
        value.telefonnummer = row_obj.telefonnummer;
        value.sendtAnsoegning = row_obj.sendtAnsoegning;
        value.godkendtArb01 = parseInt(row_obj.godkendtArb01);//Number delen i objektet skal parses som en int, da dens input bliver set som en string værdi (html inputet)
        value.godkendtArb02 = parseInt(row_obj.godkendtArb02);
        value.godkendtArb03 = parseInt(row_obj.godkendtArb03);
        delete value["action"]; //Brug delete value til at slette action, den bliver set som en værdi i objektet.
        console.log(value.kundeId)
        return this.httpService.updateKunde(value.kundeId, value).subscribe(); //Til sidst retuneres update inde i httpservice, med kunde id´et fra parameteret values. 
      }
    });
  }
  deleteRowData(row_obj) {
    this.kunder = this.dataSource.data.filter((kunObj) => //der bliver fortalt hvilken model og datatabel den skal sammenligne data´erne med, herefter laves et filter for at udvælge kunde modellen specifikt.
      kunObj.kundeId !== row_obj.kundeId, this.httpService.deleteKunde(row_obj.kundeId).subscribe()); //Den tager så kundeObj og sammenligner dens værdi og type med row_obj id. så kaldes delete kunde  
    //Den får row_obj.kundeId som værdi, så den sletter den udvalgte række.
  }

  openDialogJob(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxJobComponent, {
      width: '600px',
      height: '600px',
      data: obj
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Update') {
        this.updateRowDataJob(result.data);
      }
      else if (result.event == 'Delete') {
        this.deleteRowDataJob(result.data);
      }
    });
  }
  updateRowDataJob(row_obj) {
    this.jobs = this.dataSourceJ.data.filter((value, key) => {
      if (value.jobId == row_obj.jobId) {
        value.jobId = row_obj.jobId;
        value.arbejdstype = parseInt(row_obj.arbejdstype);
        value.jobOverskrift = row_obj.jobOverskrift;
        value.jobBeskrivelse = row_obj.jobBeskrivelse;
        value.kundeId = parseInt(row_obj.kundeId);
        value.kundeProId = parseInt(row_obj.kundeProId);
        value.jobStartTidspunkt = row_obj.jobStartTidspunkt;
        value.jobSlutTidspunkt = row_obj.jobSlutTidspunkt;
        delete value["action"];
        return this.httpService.updateJob(value.jobId, value).subscribe();
      }
    });
  }
  deleteRowDataJob(row_obj) {
    this.jobs = this.dataSourceJ.data.filter((jobObj) =>
      jobObj.jobId !== row_obj.jobId, this.httpService.deleteJob(row_obj.jobId).subscribe());
    console.log(row_obj.jobId);
    return true;
  }

  /* openDialogKundeJob(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxKundejobComponent, {
      width: '600px',
      height: '600px',
      data: obj
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Update') {
        this.updateRowDataKundeJob(result.data);
      }
      else if (result.event == 'Delete') {
        this.deleteRowDataKundeJob(result.data);
      }
    });
  }
  updateRowDataKundeJob(row_obj) {
    this.jobs = this.dataSourceJ.data.filter((value, key) => {
      if (value.jobId == row_obj.jobId) {
        value.jobId = row_obj.jobId;
        value.arbejdstype = parseInt(row_obj.arbejdstype);
        value.jobOverskrift = row_obj.jobOverskrift;
        value.jobBeskrivelse = row_obj.jobBeskrivelse;
        value.kundeId = parseInt(row_obj.kundeId);
        value.kundeProId = parseInt(row_obj.kundeProId);
        value.jobStartTidspunkt = row_obj.jobStartTidspunkt;
        value.jobSlutTidspunkt = row_obj.jobSlutTidspunkt;
        delete value["action"];
        return this.httpService.updateJob(value.jobId, value).subscribe();
      }
    });
  }
  deleteRowDataKundeJob(row_obj) {
    this.jobs = this.dataSourceJ.data.filter((jobObj) =>
      jobObj.jobId !== row_obj.jobId, this.httpService.deleteJob(row_obj.jobId).subscribe());
    console.log(row_obj.jobId);
    return true;
  } */

  openDialogFiler(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxFilerComponent, {
      width: '600px',
      height: '600px',
      data: obj
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Update') {
        this.updateRowDataFiler(result.data);
      }
      else if (result.event == 'Delete') {
        this.deleteRowDataFiler(result.data);
      }
    });
  }
  updateRowDataFiler(row_obj) {
    this.filer = this.dataSourceF.data.filter((value, key) => {
      if (value.filerId == row_obj.filerId) {
        value.DokumentationLink = row_obj.DokumentationLink;
        value.BilledeLink = row_obj.BilledeLink;
        return this.httpService.updateFiler(value.filerId, value).subscribe();
      }
    });
  }
  deleteRowDataFiler(row_obj) {
    this.filer = this.dataSourceF.data.filter((filObj) =>
      filObj.filerId !== row_obj.filerId, this.httpService.deleteFiler(row_obj.filerId).subscribe());
    console.log(row_obj.filerId);

    return true;
  }
  //#endregion

  //#region (KS) ApplyFilter
  /*
                                      ---     KOMMENTAR SEKTION     ---     
      APPLYFILTER
      this.dataSource.filter = filterValue.trim().toLowerCase(); (CODE BITE)

  */
  //#endregion

  applyFilterKunde(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyFilterJob(filterValue: string) {
    this.dataSourceJ.filter = filterValue.trim().toLowerCase();
  }

  applyFilterJobType(filterValue: string) {
    this.dataSourceJT.filter = filterValue.trim().toLowerCase();
  }

  applyFilterFiler(filterValue: string) {
    this.dataSourceF.filter = filterValue.trim().toLowerCase();
  }
}