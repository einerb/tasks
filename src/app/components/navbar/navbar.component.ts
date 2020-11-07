import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  public user: any;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  public logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  public goHome() {
    this.router.navigate(['/home']);
  }

  public goProfile() {
    this.router.navigate(['/home/profile']);
  }
}
