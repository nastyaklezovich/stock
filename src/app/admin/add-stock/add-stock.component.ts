import { Component, OnInit } from '@angular/core';
import { StockService } from '../../services/stock.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.css']
})
export class AddStockComponent implements OnInit {

  StockForm: FormGroup;
  types = [{ name: "закрытый" }, { name: "полузакрытый" }, { name: "открытый" }];

  constructor(private fb: FormBuilder, private ss: StockService) { }

  ngOnInit() {
    this.StockForm = this.fb.group({
      name: ['', Validators.compose([
        Validators.maxLength(25),
        Validators.pattern('^[A-Za-zА-Яа-яЁё]+$'),
        Validators.required
      ])],
      type: [''],
      address: ['', Validators.required],
      capacity: ['', Validators.compose([
        Validators.maxLength(20),
        Validators.pattern('^[0-9]+$'),
        Validators.required
      ])],
    })
  }

  add_stock(name, type, address, capacity) {
    const stock = {
      name: name,
      type: type,
      address: address,
      capacity: capacity,
    };
    console.log(stock);
    this.ss.add_stock(stock);
  }

  account_validation_messages = {
    'name': [
      { type: 'required', message: 'Заполните поле' },
      { type: 'maxlength', message: 'Название не может содержать больше 25 символов' },
      { type: 'pattern', message: 'Некорректное название' },
    ],
    'address': [
      { type: 'required', message: 'Заполните поле' }
    ],
    'capacity': [
      { type: 'required', message: 'Заполните поле' },
      { type: 'maxlength', message: 'Вместимость не может содержать больше 20 символов' },
      { type: 'pattern', message: 'Некорректная вместимость' },
    ]
  }

}
