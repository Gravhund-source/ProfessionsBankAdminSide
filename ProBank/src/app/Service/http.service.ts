import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Filer } from '../Models/Filer';
import { Kunde } from '../Models/Kunde';
import { Arbejdstype } from '../Models/Arbejdstype';
import { Job } from '../Models/Job';
import { AdminLogin } from '../Models/AdminLogin';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

//#region (KS) Services
/*
                                    ---     KOMMENTAR SEKTION     ---     
    GET
    
    UPDATE

    DELETE
    
    ADD

*/  
  //#endregion

export class HttpService {

  urlStart: string = "http://10.0.3.117:8085/api/"; //url for data lokation.
  adminl = new AdminLogin();

  constructor(private http: HttpClient, private router: Router) { }

  //#region Services
  getAdmin(): Observable<AdminLogin[]> {
    return this.http.get<AdminLogin[]>(`${this.urlStart}adminlogin`); //Henter data fra url lokationen med navnet på hvilken tabel de ønsker at tage fra.
  }
  getFiler(): Observable<Filer[]> {
    return this.http.get<Filer[]>(`${this.urlStart}filer`);
  }
  deleteFiler(filerToDelete: number) {
    return this.http.delete<Filer>(`${this.urlStart}filer/${filerToDelete}`, httpOptions); //Sletter data fra url lokationen, den får navnet på hvilken tabel den skal tage fra og til sidst skal der gives en værdi for at vide hvilken række der tales om.
  }
  updateFiler(FilerIdFromHtml: number, FileToUpdate: Filer): Observable<Filer> {
    return this.http.put<Filer>(`${this.urlStart}filer/${FilerIdFromHtml}`, FileToUpdate, httpOptions); //Opdater data, så får den numret på rækken der skal opdateres og så hvilken tabel "Model" som den skal opdater med
  }

  getKunde(): Observable<Kunde[]> {
    return this.http.get<Kunde[]>(`${this.urlStart}kunde`);
  }
  deleteKunde(kundeToDelete: number) {
    return this.http.delete<Kunde>(`${this.urlStart}kunde/${kundeToDelete}`, httpOptions);
  }
  updateKunde(KundeIdFromHtml: number, KundeToUpdate: Kunde): Observable<Kunde> {
    return this.http.put<Kunde>(`${this.urlStart}kunde/${KundeIdFromHtml}`, KundeToUpdate, httpOptions);
  }
 
  getJob(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.urlStart}jobs`);
  }
  deleteJob(jobToDelete: number) {
    return this.http.delete<Job>(`${this.urlStart}jobs/${jobToDelete}`, httpOptions);
  }
  updateJob(JobIdFromHtml: number, JobToUpdate: Job): Observable<Job> {
    return this.http.put<Job>(`${this.urlStart}jobs/${JobIdFromHtml}`, JobToUpdate, httpOptions);
  }
  
  getArbejdstype(): Observable<Arbejdstype[]> {
    return this.http.get<Arbejdstype[]>(`${this.urlStart}Arbejdstype`);
  }
  postArbejdstype(arbejdstypeToAdd: any): Observable<Arbejdstype> {
    return this.http.post<Arbejdstype>(`${this.urlStart}Arbejdstype/`, arbejdstypeToAdd, httpOptions); //Tilføjer data til en række i den udvalgte tabbel og får at vide hvilken måde den skal få data´erne på.
  }
  deleteArbejdstype(arbejdstypeToDelete: number):Observable<Arbejdstype> {
    return this.http.delete<Arbejdstype>(`${this.urlStart}Arbejdstype/${arbejdstypeToDelete}`, httpOptions);
  }
  updateArbejdstype(ArbejdstypeIdFromHtml: number, ArbejdstypeToUpdate: Arbejdstype): Observable<Arbejdstype> {
    return this.http.put<Arbejdstype>(`${this.urlStart}Arbejdstype/${ArbejdstypeIdFromHtml}`, ArbejdstypeToUpdate, httpOptions);
  }
  //#endregion

}