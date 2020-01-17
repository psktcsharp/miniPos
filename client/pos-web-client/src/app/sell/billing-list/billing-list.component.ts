import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-billing-list',
  templateUrl: './billing-list.component.html',
  styleUrls: ['./billing-list.component.css']
})
export class BillingListComponent implements OnInit {
  @Input() soldItemsList: any;
  @Input() itemsPathActive: boolean;
  constructor() { }

  ngOnInit() {

  }


}
