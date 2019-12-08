import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

import { BaseService } from "./base.service";
import { User, RoleType } from "../models";

@Injectable({ providedIn: "root" })
export class AuthService extends BaseService {
  private userSub: BehaviorSubject<User>;

  public currentUser: Observable<User>;

  constructor(protected http: HttpClient) {
    super(http);
    this.userSub = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("user"))
    );

    this.currentUser = this.userSub.asObservable();
  }

  public get currentUserVal(): User {
    return this.userSub.value;
  }

  public login(login: string, password: string) {
    const header = new HttpHeaders({Authorization:'Basic '+btoa(login+":"+password)});
    return this.http.get<User>(`${this.baseUrl}/login`, { headers: header }).pipe(
      map(user => {
        console.log(user);
        if (user) {
          user.authdata = btoa(login + ":" + password);
          localStorage.setItem("user", JSON.stringify(user));
          this.userSub.next(user);
        }
        return user;
      })
    );
  }

  public logout() {
    localStorage.removeItem("user");
    this.userSub.next(null);
  }

  public hasPermission(requiredRole: RoleType){
    return this.currentUserVal.role === requiredRole;
  }
}
