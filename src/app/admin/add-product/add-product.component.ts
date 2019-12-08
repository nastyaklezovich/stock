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
      name: ['', Validators.required],
      price: ['', Validators.required],
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

}
