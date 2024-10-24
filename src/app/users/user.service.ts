import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public email = 'admin99@gmail.com';
  public password = 'admin12345';
  public $logedIn = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) {}

  public isUserCorrect(email: string, password: string): boolean {
    return email === this.email && password === this.password;
  }

  public signOut() {
    this.$logedIn.next(false);
    this.router.navigateByUrl('/');
  }

  public login() {
    this.$logedIn.next(true);
    this.router.navigateByUrl('home');
  }
}
