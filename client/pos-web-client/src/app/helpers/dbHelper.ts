import { Item } from '../shared/item.model';
import { HttpClient } from '@angular/common/http'
import { throwError, Subject } from 'rxjs'
import { catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ItemListModel } from '../shared/itemList.model';
@Injectable({
    providedIn: 'root'
})
export class DatabaseService {
    item = new Subject<Item>();
    itemList = new Subject<ItemListModel>();
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
            console.log("inside helper", resData)
        }));
    }
}