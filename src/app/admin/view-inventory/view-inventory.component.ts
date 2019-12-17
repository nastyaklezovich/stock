import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../services/inventory.service';
import Inventory from '../../models/Inventory'
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-view-inventory',
  templateUrl: './view-inventory.component.html',
  styleUrls: ['./view-inventory.component.css']
})
export class ViewInventoryComponent implements OnInit {

  inventories: Inventory[];

  constructor(private is: InventoryService) { }

  ngOnInit() {
    this.is.get_inventories().subscribe((data: Inventory[]) => {
      console.log(data);
      this.inventories = data;
    })
  }

  delete_inventory(id) {
    this.is.delete_inventory(id).subscribe(res => {
      console.log(id);
      console.log('Inventory deleted')
    })
  }

  // fileName = 'ExcelSheet.xlsx';
  //
  // exportexcel(): void {
  //   /* table id is passed over here */
  //   let element = document.getElementById('excel-table');
  //   const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
  //
  //   /* generate workbook and add the worksheet */
  //   const wb: XLSX.WorkBook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  //
  //   /* save to file */
  //   XLSX.writeFile(wb, this.fileName);
  //
  // }

}
