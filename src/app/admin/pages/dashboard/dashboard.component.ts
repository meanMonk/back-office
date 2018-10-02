import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';
import {NgxSpinnerService} from 'ngx-spinner';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  records: any[];
  isSelected: boolean = false;
  selectedRecords: any[] = [];
  fileName: string = `export_${Date.now()}.xlsx`;

  constructor(private dataService: DataService,
              private spinnerService: NgxSpinnerService) { }

  ngOnInit() {
    this.loadRecord();
  }

  loadRecord() {
    this.spinnerService.show();
    this.dataService.getRecords()
      .subscribe((data: any) => {
        this.records = data;
          this.spinnerService.hide();
      },
        (err) => {
          console.log('error occurred', err);
        });
  }

  selectAll(event, models) {
    this.isSelected = !this.isSelected;
    if (event.target.checked) {
      this.selectedRecords = models;
    }
  }

  updateSelectList(event, model) {
    if (event.target.checked) {
      this.selectedRecords.push(model);
    } else {
      this.selectedRecords = this.selectedRecords.filter((item) => item.id !== model.id);
    }
  }

  exportSelected() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.selectedRecords);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.fileName);
  }

  exportAll() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.records);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.fileName);
  }
}
