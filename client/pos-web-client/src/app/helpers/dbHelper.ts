import { Item } from '../shared/item.model';
import { HttpClient } from '@angular/common/http'
import { throwError, Subject } from 'rxjs'
import { catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ItemListModel } from '../shared/itemList.model';
import { Bill } from '../shared/bill.model';
import { BillsListModel } from '../shared/billsList.model';
@Injectable({
    providedIn: 'root'
})
export class DatabaseService {
    item = new Subject<Item>();
    itemList = new Subject<ItemListModel>();
    billsList = new Subject<BillsListModel>();
    bill = new Subject<Bill>();
    constructor(private http: HttpClient) {
    }
    saveItemToDb(itemToSave: Item) {
        //subscribe in auth component 
        return this.http.post<Item>('http://localhost:8080/api/v1/items/', {
            name: itemToSave.name,
            price: itemToSave.price,
            img: itemToSave.img,
            available: itemToSave.available

        }).pipe(catchError(errorRes => {
            return throwError(errorRes)
        }), tap(resData => {
            this.item.next(itemToSave);
        }));
    }
    getItemsFromDb() {
        return this.http.get<ItemListModel>('http://localhost:8080/api/v1/items/').pipe(catchError(errorRes => {
            return throwError(errorRes)
        }), tap(resData => {
            console.log("inside items helper", resData)
        }));
    }
    saveBillToDb(billToSave: Bill) {
        return this.http.post<Item>('http://localhost:8080/api/v1/bills/', {
            cashier: billToSave.cashier,
            soldItems: billToSave.soldItems,
            total: billToSave.total,
            createdAt: billToSave.createdAt
        }).pipe(catchError(errorRes => {
            return throwError(errorRes)
        }), tap(resData => {
            this.bill.next(billToSave);
        }));
    }
    getBillsFromDb() {
        return this.http.get<BillsListModel>('http://localhost:8080/api/v1/bills/').pipe(catchError(errorRes => {
            return throwError(errorRes)
        }), tap(resData => {
            console.log("inside bills helper", resData)
        }));
    }
}