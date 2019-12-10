import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import Order from '../../models/Order';
import {OrderService} from '../../services/order.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})

export class ChartsComponent implements OnInit {

  ChartForm: FormGroup;


  lineChartData: ChartDataSets[] = [
    { data: [85, 72, 78, 75, 77, 75], label: 'Изменение спроса' },
  ];

  lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June'];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'rgb(79, 79, 79)',
      backgroundColor: 'rgb(255, 126, 51)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  constructor(private fb: FormBuilder, private os: OrderService) { }

  ngOnInit() {
    this.ChartForm = this.fb.group({
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
    })
  }

  get_data(start_date, end_date){
    const obj = {
      start_date: start_date,
      end_date: end_date,
    }

  }

}
