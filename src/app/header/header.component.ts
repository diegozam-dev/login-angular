import { Component, OnInit } from '@angular/core';
import { UserService } from '../users/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  constructor(public myService: UserService) {}

  title = 'Clínica San José';
  isUserLogedIn = false;

  ngOnInit(): void {
    this.myService.$logedIn.subscribe((data) => {
      this.isUserLogedIn = data;

      if (data) this.title = this.myService.email;
      else this.title = 'Clínica San José';
    });
  }

  conoceMas() {
    alert('Conoce más proximamente...');
  }
}
