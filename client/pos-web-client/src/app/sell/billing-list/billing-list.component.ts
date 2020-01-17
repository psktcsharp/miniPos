import { Component, OnInit, Input, EventEmitter, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Bill } from 'src/app/shared/bill.model';
import { DatabaseService } from '../../helpers/dbHelper'
import { AuthService } from '../../auth/auth.service'

@Component({
  selector: 'app-billing-list',
  templateUrl: './billing-list.component.html',
  styleUrls: ['./billing-list.component.css']
})
export class BillingListComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {

  }
  @Input() soldItemsList: any;
  @Input() itemsPathActive: boolean;
  @Input() billTotal: number;
  billAdded = new EventEmitter<Bill>()
  constructor(private dbService: DatabaseService, private authService: AuthService) {

  }

  ngOnInit() {
  }
  checkout(form: NgForm) {

    console.log(JSON.parse(localStorage.getItem('cashier')))

    //saving bill to database
    const newBill = new Bill(JSON.parse(localStorage.getItem('cashier')).id, this.soldItemsList, this.billTotal, new Date())
    this.billAdded.emit(newBill)
    this.dbService.saveBillToDb(newBill).subscribe(resData => {
      console.log(resData)
      console.log("save success")
    }, error => {
      console.log(error)
    }
    )
    console.log("checked out")
    //clearing total and bill list
    for (let el of this.soldItemsList) {
      this.soldItemsList.pop()
    }
    this.soldItemsList.pop()
    this.billTotal = 0;
  }

}
