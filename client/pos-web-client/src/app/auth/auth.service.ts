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
            localStorage.setItem("cashierOut", JSON.stringify(cashierOut))
            this.cashier.next(cashierOut)
        }));
    }

    //send the login 
    login(email: string, password: string) {
        return this.http.post<AuthResponseData>('http://localhost:8080/api/v1/auth/login', {
            email: email,
            password: password
        }).pipe(catchError(errorRes => {
            this.router.navigate(['/']);
            return throwError(errorRes)
        }), tap(resData => {
            const expirationDate = new Date(new Date().getTime() + 60000)
            const cashierOut = new Cashier(resData.fullName, resData.email, resData.id, resData.aToken, expirationDate)
            this.cashier.next(cashierOut);
            //Save to the local storage
            localStorage.setItem("cashierOut", JSON.stringify(cashierOut))

        }));
    }

    //handle logout
    logout() {
        console.log("*CLEARING LOCALSTORAGE*")
        localStorage.removeItem("cashierOut")
        this.changeData({ isAuthenticated: false });
        this.router.navigate(['/auth'])
    }

    //auto login
    autoLogin() {
        console.log("*AUTOLOGIN IS CHECKING*")
        const cashierData: {
            email: string;
            fullName: string;
            _token: string;
            id: string;
            _tokenExpirationDate: string

        } = JSON.parse(localStorage.getItem("cashier"))
        if (!cashierData) {
            return;
        }
        const LoadedCashier = new Cashier(cashierData.fullName, cashierData.email, cashierData.id, cashierData._token,
            new Date(cashierData._tokenExpirationDate))

        //check for valid token
        if (LoadedCashier.token) {
            this.changeData({ isAuthenticated: true });
            this.cashier.next(LoadedCashier)
        }
    }
}

