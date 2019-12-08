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
        Validators.minLength(3),
        Validators.pattern('^[A-Za-zА-Яа-яЁё]+$'),
        Validators.required
      ])],
      last_name: ['', Validators.compose([
        Validators.maxLength(25),
        Validators.minLength(3),
        Validators.pattern('^[A-Za-zА-Яа-яЁё]+$'),
        Validators.required
      ])],
      email: ['', Validators.compose([
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'),
        Validators.required
      ])],
      password: ['', Validators.required],
      role: ['', Validators.required],
      phone_number: ['', Validators.compose([
        Validators.pattern('375[0-9]{2}-[0-9]{3}-[0-9]{2}-[0-9]{2}'),
        Validators.required
      ])],
      position: ['', Validators.required],
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

    console.log(user);

    this.us.add_user(user);
  }

  account_validation_messages = {
    'first_name': [
      { type: 'required', message: 'Заполните поле' },
      { type: 'minlength', message: 'Имя должно содержать не менее 3 символов' },
      { type: 'maxlength', message: 'Имя не может содержать больше 25 символов' },
      { type: 'pattern', message: 'Имя может содержать только символьные значения' },
    ],
    'last_name': [
      { type: 'required', message: 'Заполните поле' },
      { type: 'minlength', message: 'Фамилия должно содержать не менее 3 символов' },
      { type: 'maxlength', message: 'Фамилия не может содержать больше 25 символов' },
      { type: 'pattern', message: 'Фамилия может содержать только символьные значения' },
    ],
    'email': [
      { type: 'required', message: 'Заполните поле' },
      { type: 'pattern', message: 'Email должен соответствовать паттерну youremail@company.com' },
    ],
    'password': [
      { type: 'required', message: 'Заполните поле' },
    ],
    'position': [
      { type: 'required', message: 'Заполните поле' },
    ],
    'phone_number': [
      { type: 'required', message: 'Заполните поле' },
      { type: 'pattern', message: 'Номер должен соответствовать паттерну (375__-___-__-__)' },

    ],
  }

}
