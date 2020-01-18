import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { throwError, Subject } from 'rxjs'
import { Cashier } from './cashier.model'
import { catchError, tap } from 'rxjs/operators';
import { error } from 'protractor'
import { Item } from '../shared/item.model'
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';



// interface with all expected return data from the sign up response 
// this to define the data that we will work with
interface AuthResponseData {
    success: boolean
    aToken: String
    msg: string
    id: string
    fullName: string
    email: string
}
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    //store the cashier as a subject
    cashier = new Subject<Cashier>();

    private dataSource = new BehaviorSubject({ isAuthenticated: false });
    currentData = this.dataSource.asObservable();
    constructor(private http: HttpClient, private router: Router) {

    }
    changeData(data: any) {
        this.dataSource.next(data);
    }
    //send a request to signup 
    signup(email: string, password: string, fullName: string) {
        //subscribe in auth component 
        return this.http.post<AuthResponseData>('http://localhost:8080/api/v1/auth/signup', {
            email: email,
            password: password,
            fullName: fullName

        }).pipe(catchError(errorRes => {
            return throwError(errorRes)
        }), tap(resData => {
            const expirationDate = new Date(new Date().getTime() + 60000)
            const cashierOut = new Cashier(resData.fullName, resData.email, resData.id, resData.aToken, expirationDate)
            const testItem = new Item("", 1, "", true, 1, 0)
            this.cashier.next(cashierOut)
        }));
    }

    //send the login 
    login(email: string, password: string) {
        return this.http.post<AuthResponseData>('http://localhost:8080/api/v1/auth/login', {
            email: email,
            password: password
        }).pipe(catchError(errorRes => {
            return throwError(errorRes)
        }), tap(resData => {
            const expirationDate = new Date(new Date().getTime() + 60000)
            const cashierOut = new Cashier(resData.fullName, resData.email, resData.id, resData.aToken, expirationDate)
            console.log('from login auth', cashierOut)
            this.cashier.next(cashierOut);
            //Save to the local storage
            localStorage.setItem("cashier", JSON.stringify(cashierOut))

        }));
    }

    //handle logout
    logout() {
        localStorage.clear();
        this.changeData({ isAuthenticated: false });
        this.router.navigate(['/auth'])
    }

}

