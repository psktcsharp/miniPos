import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { EmailValidator } from '@angular/forms'


// interface with all expected return data from the sign up response 
// this to define the data that we will work with
interface AuthResponseData {
    success: boolean
    aToken: String
}
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient) {

    }
    //send a request to signup 
    signup(email: string, password: string) {
        //subscribe in auth component 
        return this.http.post<AuthResponseData>('http://localhost:8080/api/v1/auth/signup', {
            email: email,
            password: password,

        })
    }
}