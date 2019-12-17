import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Partner from '../../models/Partner'
import Product from '../../models/Product'
import { PartnerService } from '../../services/partner.service'
import { ProductService } from '../../services/product.service'
import { OrderService } from '../../services/order.service'

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {

  OrderForm: FormGroup;
  products: Product[];
  partners: Partner[];

  constructor(private fb: FormBuilder, private prs: ProductService, private ps: PartnerService, private os: OrderService) { }

  ngOnInit() {
    this.prs.get_products().subscribe((data: Product[]) => {
      this.products = data;
      console.log('products');
      console.log(this.products);
    })

    this.ps.get_customer().subscribe((data: Partner[]) => {
      this.partners = data;
      console.log('partners');
      console.log(this.partners);
    })

    this.OrderForm = this.fb.group({
      date: ['', Validators.required],
      product_id: [''],
      partner_id: [''],
      quantity: ['', Validators.compose([
        Validators.maxLength(20),
        Validators.pattern('^[0-9]+$'),
        Validators.required
      ])],
      sum: ['', Validators.compose([
        Validators.maxLength(20),
        Validators.pattern('^[0-9]+$'),
        Validators.required
      ])],
      paid_sum: ['', Validators.compose([
        Validators.maxLength(20),
        Validators.pattern('^[0-9]+$'),
        Validators.required
      ])],
      // status: ['', Validators.required],
    })

  }

  add_order(date, partner_id, product_id,  quantity, sum, paid_sum) {
    const order = {
      date: date,
      partner_id: {id: partner_id},
      product_id: {id: product_id},
      quantity: quantity,
      sum: sum,
      paid_sum: paid_sum,
    }
    console.log(order);
    this.os.add_order(order);
  }

  account_validation_messages = {
    'quantity': [
      { type: 'required', message: 'Заполните поле' },
      { type: 'maxlength', message: 'Количество не может содержать больше 20 символов' },
      { type: 'pattern', message: 'Некорректное количество' },
    ],
    'date': [
      { type: 'required', message: 'Заполните поле' }
    ],
    'sum': [
      { type: 'required', message: 'Заполните поле' },
      { type: 'maxlength', message: 'Стоимость не может содержать больше 20 символов' },
      { type: 'pattern', message: 'Некорректная стоимость' },
    ],
    'paid_sum': [
      { type: 'required', message: 'Заполните поле' },
      { type: 'maxlength', message: 'Стоимость не может содержать больше 20 символов' },
      { type: 'pattern', message: 'Некорректная стоимость' },
    ]
  }

}
