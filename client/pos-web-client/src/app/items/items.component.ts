import { Component, OnInit, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { Item } from '../shared/item.model';
import { DatabaseService } from '../helpers/dbHelper'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
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
  error: string = null;
  constructor(private dbService: DatabaseService, private router: Router) { }
  ngOnInit() {
  }
  onAddItem() {
    const newItem = new Item(this.nameInputRef.nativeElement.value
      , this.priceInputRef.nativeElement.value, this.imgInputRef.nativeElement.value, Boolean(this.availableInputRef.nativeElement.value), 1, 1)
    this.itemAdded.emit(newItem)
    // addForm.reset();
    this.dbService.saveItemToDb(newItem).subscribe(resData => {
      this.error = `${newItem.name} has been saved successfully`;
    }, error => {
      this.error = `${newItem.name} couldn't be saved, please try again`;
      console.log(error)
    }
    )
  }
  onHandleError() {
    this.error = null;
  }
  isDirectoryPath() {
    return this.router.isActive('items', false); // <-- getting active route to be used later
  }


}
