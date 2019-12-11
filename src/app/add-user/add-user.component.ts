import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  roles = [{ name: "USER" }, { name: "ADMIN" }];
  UserForm: FormGroup;

  constructor(private fb: FormBuilder, private us: UserService) { }

  ngOnInit() {
    this.UserForm = this.fb.group({
      first_name: ['', Validators.compose([
        Validators.maxLength(25),
        Validators.pattern('^[A-Za-zА-Яа-яЁё]+$'),
        Validators.required
      ])],
      last_name: ['', Validators.compose([
        Validators.maxLength(25),
        Validators.pattern('^[A-Za-zА-Яа-яЁё]+$'),
        Validators.required
      ])],
      email: ['', Validators.compose([
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'),
        Validators.required
      ])],
      password: ['', Validators.required],
      role: [''],
      phone_number: ['', Validators.compose([
        Validators.pattern('[0-9]{5}-[0-9]{3}-[0-9]{2}-[0-9]{2}'),
        Validators.required
      ])],
      position: ['', Validators.compose([
        Validators.maxLength(25),
        Validators.pattern('^[A-Za-zА-Яа-яЁё]+$'),
      ])],
    })
  }

  add_user(first_name, last_name, email, password, role, phone_number, position) {

    const user = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password,
      role: role,
      phone_number: phone_number,
      position: position,
    };

    console.log(this.UserForm)

    console.log(user);

    this.us.add_user(user);
  }

  account_validation_messages = {
    'first_name': [
      { type: 'required', message: 'Заполните поле' },
      { type: 'maxlength', message: 'Имя не может содержать больше 25 символов' },
      { type: 'pattern', message: 'Имя может содержать только символьные значения' },
    ],
    'last_name': [
      { type: 'required', message: 'Заполните поле' },
      { type: 'maxlength', message: 'Фамилия не может содержать больше 25 символов' },
      { type: 'pattern', message: 'Фамилия может содержать только символьные значения' },
    ],
    'email': [
      { type: 'required', message: 'Заполните поле' },
      { type: 'pattern', message: 'Некорректный email' },
    ],
    'password': [
      { type: 'required', message: 'Заполните поле' },
    ],
    'position': [
      { type: 'required', message: 'Заполните поле' },
      { type: 'maxlength', message: 'Должность не может содержать больше 25 символов' },
      { type: 'pattern', message: 'Должность может содержать только символьные значения' },
    ],
    'phone_number': [
      { type: 'required', message: 'Заполните поле' },
      { type: 'pattern', message: 'Номер должен соответствовать паттерну (*****-***-**-**)' },
    ],
  }

}
