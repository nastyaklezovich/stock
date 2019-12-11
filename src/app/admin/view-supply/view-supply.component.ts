import { Component, OnInit, TemplateRef } from '@angular/core';
import Supply from '../../models/Supply'
import { SupplyService } from '../../services/supply.service'
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Product from '../../models/Product'
import Partner from '../../models/Partner'
import Stock from '../../models/Stock'
import { User } from '../../core/models/user'
import { ProductService } from '../../services/product.service'
import { UserService } from '../../services/user.service'
import { PartnerService } from 'src/app/services/partner.service';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-view-supply',
  templateUrl: './view-supply.component.html',
  styleUrls: ['./view-supply.component.css']
})
export class ViewSupplyComponent implements OnInit {

  supplies: Supply[];
  products: Product[];
  partners: Partner[];
  stocks: Stock[];
  users: User[];
  modalRef: BsModalRef;
  SupplyForm: FormGroup;
  res: {} = {};
  supply: {} = {};

  constructor(private ss: SupplyService, private route: ActivatedRoute, private fb: FormBuilder, private modalService: BsModalService, private us: UserService, private prs: ProductService, private ps: PartnerService, private sts: StockService) {
    this.createForm();
  }

  createForm() {
    this.SupplyForm = this.fb.group({
      date: ['', Validators.required],
      quantity: ['', Validators.compose([
        Validators.maxLength(15),
        Validators.pattern('^[0-9]+$'),
        Validators.required
      ])],
      worker_id: [''],
      product_id: [''],
      stock_id: [''],
      partner_id: [''],

    })
  }

  ngOnInit() {
    this.ss.get_supplies().subscribe((data: Supply[]) => {
      console.log(data);
      this.supplies = data;
    });
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

  delete_supply(id) {
    this.ss.delete_supply(id).subscribe(res => {
      console.log(id);
      console.log('Deleted');
    });
  }

  save(product_id, worker_id, stock_id, partner_id, quantity, date, id) {
    const supply = {
      product_id: product_id,
      worker_id: worker_id,
      stock_id: stock_id,
      partner_id: partner_id,
      quantity: quantity,
      date: date,
    }
    console.log(supply);

    this.route.params.subscribe(params => {
      this.ss.update_supply(this.supply, id);
      this.modalRef.hide();
    });
  }

  open_modal(template: TemplateRef<any>, id) {
    this.modalRef = this.modalService.show(template);
    console.log(id);
    this.ss.edit_supply(id).subscribe(((res: Supply[]) => {
      this.supply = { ...res };
      this.res = res;
      console.log(res);
    }));
  }

  account_validation_messages = {
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

