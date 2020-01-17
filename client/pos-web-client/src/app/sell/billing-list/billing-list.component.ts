import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-billing-list',
  templateUrl: './billing-list.component.html',
  styleUrls: ['./billing-list.component.css']
})
export class BillingListComponent implements OnInit {
  @Input() soldItemsList: any;
  @Input() itemsPathActive: boolean;
  @Input() billTotal: number;
  constructor() { }

  ngOnInit() {

  }
  checkout(form: NgForm) {
    console.log("checked out")

    for (let el of this.soldItemsList) {
      this.soldItemsList.pop()
    }
    this.soldItemsList.pop()
    this.billTotal = 0;
  }

}
