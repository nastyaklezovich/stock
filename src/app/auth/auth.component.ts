import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../core";

import { first } from "rxjs/operators";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  private authForm: FormGroup;
  private returnUrl: string;
  private error: any;

  constructor( private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private authService: AuthService ) {

  }

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      login: ['', Validators.compose([
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'),
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])],
    });

    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";

  }

  onSubmit() {
    console.log(this.authForm.controls.login.value),
    console.log(this.authForm.controls.password.value),
    this.authService
      .login(
        this.authForm.controls.login.value,
        this.authForm.controls.password.value,
      )
      .pipe(first())
      .subscribe(
        () => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error;
          alert("Некорректный логин или пароль!")
        }
      );
  }

  account_validation_messages = {
    'login': [
      { type: 'required', message: 'Заполните поле' },
      { type: 'pattern', message: 'Email должен соответствовать паттерну youremail@company.com' },
    ],
    'password': [
      { type: 'required', message: 'Заполните поле' },
      { type: 'minlength', message: 'Пароль должен содержать не менее 5 символов' },
    ],

  }

}
