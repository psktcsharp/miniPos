import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../helpers/dbHelper';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  totalToday: number;
  totalOverAll: number;
  billsList: any;

  constructor(private dbService: DatabaseService) {
    this.totalToday = 0;
    this.totalOverAll = 0;
  }

  ngOnInit() {

    this.dbService.getBillsFromDb().subscribe(resData => {
      console.log("inside component", resData)
      this.billsList = resData.data
      for (let bill of this.billsList) {
        if (new Date(bill.createdAt).toDateString() === new Date().toDateString()) {
          console.log()
          this.totalToday += Number(bill.total);
        }
        this.totalOverAll += Number(bill.total);
      }
    }, error => {
      console.log(error)
    }
    )
  }

}
