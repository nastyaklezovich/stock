import {Component, OnInit, TemplateRef} from '@angular/core';
import {SupplyService} from '../../services/supply.service'
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Product from '../../models/Product'
import {ProductService} from '../../services/product.service'
import {UserService} from '../../services/user.service'
import {PartnerService} from 'src/app/services/partner.service';
import {StockService} from 'src/app/services/stock.service';

@Component({
  selector: 'app-view-supply',
  templateUrl: './view-supply.component.html',
  styleUrls: ['./view-supply.component.css']
})
export class ViewSupplyComponent implements OnInit {

  supplies: any;
  products: any;
  partners: any;
  stocks: any;
  users: any;
  modalRef: BsModalRef;
  SupplyForm: FormGroup;
  res: any;
  supply: any;
 // sup = {"date":"2019-12-20","quantity":"32","id":"a377473b-7afb-4fe0-8414-3071a98e885b","worker_id":{"email":"fghjke@mail.ru","password":"12345678","role":"USER","position":"Кладовщик","id":"8776cd90-9c3e-4b07-b844-e0096d7be299","first_name":"Татьяна","last_name":"Черняк","phone_number":"37529-101-37-88"},"product_id":{"name":"Стол","price":"200","id":"a24bfefa-dce7-4fbc-96f4-b05e03c3734d"},"stock_id":{"name":"Склад \"Краб\"","type":"закрытый","address":"г. Минск, ул. Якуба Коласа, д. 10","capacity":"200000","id":"f182ba9d-32fd-49d5-ba73-628181461b5f"},"partner_id":{"name":"Еврологистик","role":"поставщик","address":"г. Рига","id":"fb623a75-587f-4dab-8e39-f2579cbb30f8"}}  sup = { id: "1", product_id: { name: "name", id: "id"}, partner_id: {name: "partner", id:"id"}, quantity: "1000", date: "24.12.1998", id: "id_sup" };


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
      product_id: [{value: '', disabled: true}],
      stock_id: [''],
      partner_id: [{value: '', disabled: true}],

    })
  }

  ngOnInit() {
    this.ss.get_supplies().subscribe((data: any) => {
      console.log('supplies')
      console.log(data);
      this.supplies = data;
    });
    this.sts.get_stocks().subscribe((data: any) => {
      this.stocks = data;
      console.log('stocks');
      console.log(this.stocks);
    })
    this.us.get_users().subscribe((data: any) => {
      this.users = data;
      console.log('users');
      console.log(this.users);
    })
    this.ps.get_provider().subscribe((data: any) => {
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
      alert('Поставка удалена!')
      console.log(id);
      console.log('Deleted');
    });
  }

  save(product_id, worker_id, stock_id, partner_id, quantity, date, id) {
    const suppl = {
      product_id: {id: product_id},
      worker_id: {id: worker_id},
      stock_id: {id: stock_id},
      partner_id: {id: partner_id},
      quantity: quantity,
      date: date,
    }
    console.log(suppl);
    this.route.params.subscribe(params => {
      this.ss.update_supply(suppl, id);
      this.modalRef.hide();
    });
  }

  open_modal(template: TemplateRef<any>, id) {
    this.modalRef = this.modalService.show(template);
    console.log(id);
    this.ss.edit_supply(id).subscribe(((res: any) => {
      this.supply = {...res};
      this.res = res;
      console.log(res);
    }));
  }

  account_validation_messages = {
    'date': [
      {type: 'required', message: 'Заполните поле'},
    ],
    'quantity': [
      {type: 'required', message: 'Заполните поле'},
      {type: 'pattern', message: 'Некорректно введены данные'},
      {type: 'maxlength', message: 'Название не может содержать больше 15 символов'},
    ],
    'worker_id': [
      {type: 'required', message: 'Заполните поле'},
    ],
    'product_id': [
      {type: 'required', message: 'Заполните поле'},
    ],
    'stock_id': [
      {type: 'required', message: 'Заполните поле'},
    ],
  }

}

