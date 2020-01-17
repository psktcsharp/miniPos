import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/helpers/dbHelper';
import { Router } from '@angular/router';
import { Item } from 'src/app/shared/item.model';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  itemsList: any;
  soldItemsList: any;
  tempList: any;

  constructor(private dbService: DatabaseService, private router: Router) { }

  ngOnInit() {
    this.getItems()
    this.soldItemsList = [];
    this.tempList = [];

  }
  getItems() {
    this.dbService.getItemsFromDb().subscribe(resData => {
      console.log("inside component", resData)
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

      console.log("ddddddddddd2")
      this.soldItemsList.push(item)


    } else {
      var dublicatedFound = 0;
      for (let elm of this.soldItemsList) {
        if (elm.id === item.id) {
          console.log("double found")
          dublicatedFound = 1;

        }

      }
      if (dublicatedFound === 0)
        this.soldItemsList.push(item)

    }



    //filter list



  }
  // isDirectoryPath() {
  //   return this.router.isActive('items', false); // <-- getting active route to be used later
  // }

}
