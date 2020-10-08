import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router)
  {}
  
  canActivate(){
    
    if (localStorage.getItem('IsLoggedIn')) //Hvis IsLoggedIn er til stede, så retuner den true
    {
      return true;      
    }

    this.router.navigate(['login']) //hvis if statementet ikke går i opfyldelse så bliver bruger navigeret tilbage til login.
    return false;

  }
  
}
