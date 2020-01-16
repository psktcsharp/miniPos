import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/helpers/dbHelper';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  itemsList: any;

  constructor(private dbService: DatabaseService) { }

  ngOnInit() {
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
}
