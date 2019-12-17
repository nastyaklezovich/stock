import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  ProductForm: FormGroup;

  constructor(private fb: FormBuilder, private ps: ProductService) { }

  ngOnInit() {
    this.ProductForm = this.fb.group({
      name: ['', Validators.compose([
        Validators.maxLength(25),
        Validators.required
      ])],
      price: ['', Validators.compose([
        Validators.maxLength(20),
        Validators.pattern('^[0-9]+$'),
        Validators.required
      ])],
    })
  }

  add_product(name, price) {
    const product = {
      name: name,
      price: price,
    }
    console.log(product);
    this.ps.add_product(product);
  }

  account_validation_messages = {
    'name': [
      { type: 'required', message: 'Заполните поле' },
      { type: 'maxlength', message: 'Название не может содержать больше 25 символов' },
      { type: 'pattern', message: 'Некорректное название' },
    ],
    'price':[
      { type: 'required', message: 'Заполните поле' },
      { type: 'maxlength', message: 'Стоимость не может содержать больше 20 символов' },
      { type: 'pattern', message: 'Некорректная стоимость' },
    ]
  }

  }
