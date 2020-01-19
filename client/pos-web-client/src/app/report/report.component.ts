import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../helpers/dbHelper';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  totalToday: number;
  totalOverAll: number;
  billsList: any;
  htmlToSend: string

  constructor(private dbService: DatabaseService, private http: HttpClient) {
    this.totalToday = 0;
    this.totalOverAll = 0;
  }

  ngOnInit() {

    this.dbService.getBillsFromDb().subscribe(resData => {
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

  sendMail() {
    try {
      this.htmlToSend = (`<table style="height: 113px; width: 346px; border-color: green; border: 1px solid black;">
      <tbody>
      <tr>
      <td style="width: 190.4px; border: 1px solid black; text-align: center;"><span style="color: #0000ff;"><strong>Today's Sales Total&nbsp;</strong></span></td>
      <td style="width: 140.8px; border: 1px solid black; text-align: center;"><span style="color: #ff0000;">${this.totalToday}</span></td>
      </tr>
      <tr>
      <td style="width: 190.4px; border: 1px solid black; text-align: center;"><span style="color: #0000ff;"><strong>All Time Sales Total</strong></span></td>
      <td style="width: 140.8px; border: 1px solid black; text-align: center;"><span style="color: #ff0000;">${this.totalOverAll}</span></td>
      </tr>
      </tbody>
      </table>
      <p>&nbsp;</p>
      <blockquote>
      <p>Sent from MIniPosWeb @ ${new Date()}</p>
      </blockquote>`)
      this.dbService.sendMail(this.htmlToSend).subscribe()
    } catch (error) {
      console.log(error)
    }
  }

}
