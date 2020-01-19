import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/helpers/dbHelper';
import { Router, ActivatedRoute } from '@angular/router';
import { Item } from 'src/app/shared/item.model';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  itemsList: any;
  soldItemsList: any;
  tempList: any;
  billTotal: number;
  currentCashier: string;
  insideSell: boolean

  constructor(private dbService: DatabaseService, private authService: AuthService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.getItems()
    this.soldItemsList = [];
    this.tempList = [];
    this.activatedRoute.url.subscribe(url => {
      this.insideSell = url[0].path === 'sell'
    })

  }
  getItems() {
    console.log("*SENDING A REQUEST TO GET ALL ITEMS*")
    this.dbService.getItemsFromDb().subscribe(resData => {
      this.itemsList = resData.data
    }, error => {
      console.log(error)
    }
    )
  }
  onSelect(item: Item) {
    item.soldQuantity = item.fakeQuantity
    item.id = item["_id"]
    if (this.soldItemsList.length === 0) {
      this.soldItemsList.push(item)
    } else {
      var dublicatedFound = 0;
      for (let elm of this.soldItemsList) {
        if (elm.id === item.id) {
          dublicatedFound = 1;
        }
      }
      if (dublicatedFound === 0)
        this.soldItemsList.push(item)
    }

    //calculating total
    this.billTotal = 0;
    for (let elm of this.soldItemsList) {
      this.billTotal += (elm.price * elm.soldQuantity)
    }
  }


}
