import { Component, OnInit, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { Item } from '../shared/item.model';
import { DatabaseService } from '../helpers/dbHelper'
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
  constructor() { }

  ngOnInit() {
  }
  onAddItem() {
    const newItem = new Item(this.nameInputRef.nativeElement.value
      , this.priceInputRef.nativeElement.value, this.imgInputRef.nativeElement.value, this.availableInputRef.nativeElement.value)
    this.itemAdded.emit(newItem)
    console.log(newItem)
    // addForm.reset();
    const dbService = new DatabaseService();
    dbService.saveItemToDb(newItem)
  }



}
