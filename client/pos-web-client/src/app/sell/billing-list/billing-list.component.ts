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
  error: string = null;
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
    //saving bill to database
    const newBill = new Bill(JSON.parse(localStorage.getItem('cashierOut')).id, this.soldItemsList, this.billTotal, new Date())
    this.billAdded.emit(newBill)
    this.dbService.saveBillToDb(newBill).subscribe(resData => {
      console.log("save success")
      this.error = "A new bill has been saved with success ";
    }, error => {
      this.error = "Sorry ! Couldn't save the bill at this time"
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
  onHandleError() {
    this.error = null;
  }

}
