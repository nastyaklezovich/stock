import { Component, OnInit } from '@angular/core';
import { User, AuthService } from '../core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private currentUser: User;
  role: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.currentUser.subscribe(val => (this.currentUser = val));
  }

  public logout() {
    this.authService.logout();
    this.router.navigate(["/home"]);
  }

  public get isAuthenthicated(): boolean {
    return this.currentUser !== null;
  }

  public get isAdmin(): boolean {
    return this.currentUser.role == "ADMIN";
  }

  public get isUser(): boolean {
    return this.currentUser.role == "USER"
  }

}
