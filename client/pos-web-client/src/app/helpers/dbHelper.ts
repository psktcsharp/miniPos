import { Item } from '../shared/item.model';
import { HttpClient } from '@angular/common/http'
import { throwError, Subject } from 'rxjs'
import { catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})
export class DatabaseService {
    item = new Subject<Item>();
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
}