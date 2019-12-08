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
  types = [{ name: "закрытый" }, { name: "полузакрытый" }, {name: "открытый"}];

  constructor(private fb: FormBuilder, private ss: StockService) { }

  ngOnInit() {
    this.StockForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      address: ['', Validators.required],
      capacity: ['', Validators.required],
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

}
