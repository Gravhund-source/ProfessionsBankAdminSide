import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminLogin } from 'src/app/Models/AdminLogin';
import { HttpService } from 'src/app/Service/http.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  form: FormGroup;
  adminl: AdminLogin[];
  adminLOGIN: AdminLogin;

  get brugernavn() { return this.form.get('brugernavn'); } //brugernavn & kodeord bliver hentet fra form.
  get kodeord() { return this.form.get('kodeord'); } //Den bliver bekræftet ved det ord som vi har skrevet inde i ''.

  constructor(private httpService: HttpService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.httpService.getAdmin().subscribe((adminLoginInfo: any) => { //httpservice henter data som så bliver puttet ind i adminLoginInfo
      this.adminl = adminLoginInfo; //adminl får værdier fra adminLoginInfo.

      return this.adminl; //adminl bliver retuneret til programmet.
    });

    this.form = this.formBuilder.group({
      brugernavn: '', //Der gives en værdi (som bliver ændret med brugerens input).
      kodeord: '',
    });
  }

  onLogin() {
    if (this.form.valid) {
      const resultA = JSON.stringify(this.adminl) //resultA får værdien fra adminl som er blevet stringified (så det passer mere som en json struktur).
      var result = JSON.parse(resultA); //result får parsed værdien fra resultA.

      result.bruger1 = this.adminl[0]; //result.bruger1 får alle værdier fra this.adminl.
      result.bruger2 = this.adminl[1];

      if (this.brugernavn.value == result.bruger1.brugernavn && this.kodeord.value == result.bruger1.kodeord
        || this.brugernavn.value == result.bruger2.brugernavn && this.kodeord.value == result.bruger2.kodeord) {
        this.router.navigate(['admin']); //Router navigate naviger en fra login over til admin siden.
      }
      else {
        this.brugernavn.value == "Der Skete en fejl i programmet";
      }
    }
  }
}
