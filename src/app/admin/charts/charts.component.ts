import {Component, OnInit} from '@angular/core';
// import Order from '../../models/Order';
// import {OrderService} from '../../services/order.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Supply from '../../models/Supply';
import {SupplyService} from '../../services/supply.service'
import * as XLSX from 'xlsx';
import {ChartDataSets} from "chart.js";
import {Color, Label} from "ng2-charts";

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})

export class ChartsComponent implements OnInit {

  ChartForm: FormGroup;
  supplies: Supply;
  data = [];
  arr = [];

  constructor(private fb: FormBuilder, private ss: SupplyService) {
  }

  ngOnInit() {
    this.ChartForm = this.fb.group({
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
    })
  }

  fileName = 'deliveryReport.xlsx';
  isOk = false;
  error: any;

  get_data(start_date, end_date) {
    const obj = {
      start_date: start_date,
      end_date: end_date,
    }
    console.log(obj);
    this.ss.get_data(obj).subscribe(
        (res: Supply) => {
          this.supplies = res;
          console.log(this.supplies);
          this.isOk = true;
          // const array = [];
          // const date_array = [];
          // this.supplies.forEach(function (item, i, supplies) {
          //   array.push(item.quantity);
          // });
          // console.log(array);
          // this.data = array;
          // console.log(this.data)
          // this.supplies.forEach(function (item, i, supplies) {
          //   date_array.push(item.date);
          // });
          // this.arr = date_array;
          // console.log(this.arr)
        },
        error => {
          this.error = error.message;
          console.log(error);
          alert('В этот промежуток времени поставки не осуществлялись!')
        })
  }

  // lineChartData: ChartDataSets[] = [
  //   {data: this.data, label: 'Изменение кол-ва поставок'},
  // ];

  // lineChartLabels: Label[] = this.arr;
  //
  // lineChartOptions = {
  //   responsive: true,
  // };
  //
  // lineChartColors: Color[] = [
  //   {
  //     borderColor: 'rgb(79, 79, 79)',
  //     backgroundColor: 'rgb(255, 169, 64)',
  //   },
  // ];
  //
  // lineChartLegend = true;
  // lineChartPlugins = [];
  // lineChartType = 'line';

  exportexcel(): void {
    /* table id is passed over here */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

  account_validation_messages = {
    'end_date': [
      {type: 'required', message: 'Заполните поле'},
    ],
    'start_date': [
      {type: 'required', message: 'Заполните поле'}
    ],
  }

}
