import { Component, OnInit, TemplateRef } from '@angular/core';
import { ProductService } from '../../services/product.service';
import Product from '../../models/Product';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

  products: Product[];
  modalRef: BsModalRef;
  ProductForm: FormGroup;
  res: {} = {};
  product: {} = {};

  constructor(private ps: ProductService, private route: ActivatedRoute, private fb: FormBuilder, private modalService: BsModalService) {
    this.createForm();
  }

  createForm() {
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
  ngOnInit() {
    this.ps.get_products().subscribe((data: Product[]) => {
      console.log(data);
      this.products = data;
    })
  }

  delete_product(id) {
    this.ps.delete_product(id).subscribe(res => {
      alert('Продукт удален!')
      console.log(id);
      console.log('Product deleted')
    })
  }

  save(name, price, id) {

    const product = {
      name: name,
      price: price,
    }

    this.route.params.subscribe(params => {
      this.ps.update_product(product, id);
      this.modalRef.hide();
    });
  }

  open_modal(template: TemplateRef<any>, id) {
    this.modalRef = this.modalService.show(template);
    console.log(id);
    this.ps.edit_product(id).subscribe(((res: Product[]) => {
      this.product = { ...res };
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
    'price': [
      { type: 'required', message: 'Заполните поле' },
      { type: 'maxlength', message: 'Стоимость не может содержать больше 20 символов' },
      { type: 'pattern', message: 'Некорректная стоимость' },
    ]
  }


}
