import { Component, OnInit, TemplateRef } from '@angular/core';
import { User } from '../../core/models/user';
import { UserService } from '../../services/user.service'
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {

  users: User[];
  modalRef: BsModalRef;
  UserForm: FormGroup;
  res: {} = {};
  user: {} = {};
  roles = [{ name: "USER" }, { name: "ADMIN" }];

  constructor(private us: UserService, private route: ActivatedRoute, private fb: FormBuilder, private modalService: BsModalService) {
    this.createForm();
  }

  createForm() {
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

  ngOnInit() {
    this.us.get_users().subscribe((data: User[]) => {
      console.log(data);
      this.users = data;
    });
  }

  delete_user(id) {
    this.us.delete_user(id).subscribe(res => {
      console.log(id);
      console.log('User deleted');
    })
  }

  save(first_name, last_name, email, password, role, phone_number, position) {

    const user = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password,
      role: role,
      phone_number: phone_number,
      position: position,
    };

    this.route.params.subscribe(params => {
      this.us.update_user(user, params['id']);
      this.modalRef.hide();
    });
  }

  open_modal(template: TemplateRef<any>, id) {
    this.modalRef = this.modalService.show(template);
    console.log(id);
    this.us.edit_user(id).subscribe(((res: User[]) => {
      this.user = { ...res };
      this.res = res;
      console.log(res);
    }));
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
