import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { EmailValidator } from '@angular/forms'
import { throwError, Subject } from 'rxjs'
import { Cashier } from './cashier.model'
import { catchError, tap } from 'rxjs/operators';


// interface with all expected return data from the sign up response 
// this to define the data that we will work with
interface AuthResponseData {
    success: boolean
    aToken: String
    msg: string
}
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    //store the cashier as a subject
    cashier = new Subject<Cashier>();
    constructor(private http: HttpClient) {

    }
    //send a request to signup 
    signup(email: string, password: string, fullName: string) {
        //subscribe in auth component 
        return this.http.post<AuthResponseData>('http://localhost:8080/api/v1/auth/signup', {
            email: email,
            password: password,
            fullName: fullName

        }).pipe(catchError(this.handleError), tap(resData => {
            const expirationDate = new Date(new Date().getTime() + 60000)
            const cashier = new Cashier(
                resData.email,
                resData.id,
                resData.aToken,
                expirationDate);
        }));
    }
    handleError(handleError: any): import("rxjs").OperatorFunction<AuthResponseData, any> {
        throw new Error("Method not implemented.")
    }
    //send the login 
    login(email: string, password: string) {
        return this.http.post<AuthResponseData>('http://localhost:8080/api/v1/auth/login', {
            email: email,
            password: password
        })
    }
}