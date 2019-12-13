import { Component, OnInit, TemplateRef } from '@angular/core';
import { StockService } from '../../services/stock.service'
import Stock from '../../models/Stock'
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-view-stock',
  templateUrl: './view-stock.component.html',
  styleUrls: ['./view-stock.component.css']
})
export class ViewStockComponent implements OnInit {

  stocks: Stock[];
  modalRef: BsModalRef;
  StockForm: FormGroup;
  res: {} = {};
  stock: {} = {};
  types = [{ name: "закрытый" }, { name: "полузакрытый" }, { name: "открытый" }];

  constructor(private ss: StockService, private route: ActivatedRoute, private fb: FormBuilder, private modalService: BsModalService) {
    this.createForm();
  }

  createForm() {
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

  ngOnInit() {
    this.ss.get_stocks().subscribe((data: Stock[]) => {
      console.log(data);
      this.stocks = data;
    })
  }

  delete_stock(id) {
    this.ss.delete_stock(id).subscribe(res => {
      alert('Склад удален!');
      console.log(id);
      console.log('Stock deleted');
    })
  }

  save(name, type, address, capacity, id) {
    const stock = {
      name: name,
      type: type,
      address: address,
      capacity: capacity,
    };
    console.log(stock);

    this.route.params.subscribe(params => {
      this.ss.update_stock(stock, id);
      this.modalRef.hide();
    });
  }

  open_modal(template: TemplateRef<any>, id) {
    this.modalRef = this.modalService.show(template);
    console.log(id);
    this.ss.edit_stock(id).subscribe(((res: Stock[]) => {
      this.stock = { ...res };
      this.res = res;
      console.log(res);
    }));
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
