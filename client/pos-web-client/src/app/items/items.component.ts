import { Component, OnInit, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { Item } from '../shared/item.model';
import { DatabaseService } from '../helpers/dbHelper'
import { HttpClient } from '@angular/common/http'
@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  @ViewChild('nameInput', { static: false }) nameInputRef: ElementRef;
  @ViewChild('priceInput', { static: false }) priceInputRef: ElementRef;
  @ViewChild('imgInput', { static: false }) imgInputRef: ElementRef;
  @ViewChild('availableInput', { static: false }) availableInputRef: ElementRef;
  itemAdded = new EventEmitter<Item>()
  constructor(private dbService: DatabaseService) { }

  ngOnInit() {
  }
  onAddItem() {
    const itemList = []
    const newItem = new Item(this.nameInputRef.nativeElement.value
      , this.priceInputRef.nativeElement.value, this.imgInputRef.nativeElement.value, Boolean(this.availableInputRef.nativeElement.value))
    this.itemAdded.emit(newItem)
    console.log(typeof newItem.available)
    // addForm.reset();
    this.dbService.saveItemToDb(newItem).subscribe(resData => {
      console.log(resData)

    }, error => {
      console.log(error)
    }
    )
  }



}
