import { Component, OnInit } from '@angular/core';
import { SupplyService } from '../../services/supply.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StockService } from '../../services/stock.service';
import { ProductService } from '../../services/product.service';
import { UserService } from '../../services/user.service';
import { PartnerService } from '../../services/partner.service';
import Product from '../../models/Product'
import Partner from '../../models/Partner'
import { User } from '../../core/models/user'
import Stock from '../../models/Stock'

@Component({
  selector: 'app-add-supply',
  templateUrl: './add-supply.component.html',
  styleUrls: ['./add-supply.component.css']
})
export class AddSupplyComponent implements OnInit {

  SupplyForm: FormGroup;
  products: Product[];
  partners: Partner[];
  users: User[];
  stocks: Stock[];

  constructor(private fb: FormBuilder, private ss: SupplyService, private sts: StockService, private prs: ProductService, private us: UserService, private ps: PartnerService) {
    this.create_form();
  }

  create_form() {
    this.SupplyForm = this.fb.group({
      date: ['', Validators.required],
      quantity: ['', Validators.compose([
        Validators.maxLength(15),
        Validators.pattern(/^[0-9]/),
        Validators.required
      ])],
      worker_id: ['', Validators.required],
      product_id: ['', Validators.required],
      stock_id: ['', Validators.required],
      partner_id: ['', Validators.required],

    })
  }

  ngOnInit() {
    this.sts.get_stocks().subscribe((data: Stock[]) => {
      this.stocks = data;
      console.log('stocks');
      console.log(this.stocks);
    })
    this.us.get_users().subscribe((data: User[]) => {
      this.users = data;
      console.log('users');
      console.log(this.users);
    })
    this.ps.get_provider().subscribe((data: Partner[]) => {
      this.partners = data;
      console.log('providers');
      console.log(this.partners)
    })
    this.prs.get_products().subscribe((data: Product[]) => {
      this.products = data;
      console.log('products');
      console.log(this.products);
    })

  }

  add_supply(product_id, worker_id, stock_id, partner_id, quantity, date) {
    const obj = {
      product_id: product_id,
      worker_id: worker_id,
      stock_id: stock_id,
      partner_id: partner_id,
      quantity: quantity,
      date: date,
    }
    console.log(obj);
    this.ss.add_supply(obj);
  }

  acquantity_validation_messages = {
    'date': [
      { type: 'required', message: 'Заполните поле' },
    ],
    'quantity': [
      { type: 'required', message: 'Заполните поле' },
      { type: 'pattern', message: 'Некорректно введены данные' },
      { type: 'maxlength', message: 'Название не может содержать больше 15 символов' },
    ],
    'worker_id': [
      { type: 'required', message: 'Заполните поле' },
    ],
    'product_id': [
      { type: 'required', message: 'Заполните поле' },
    ],
    'stock_id': [
      { type: 'required', message: 'Заполните поле' },
    ],
  }
}
