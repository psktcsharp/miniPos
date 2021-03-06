export class Cashier {
    constructor(public fullName: string, public email: string, public id: string, private _token: String, private _tokenExpirationDate: Date) { }
    //check if token is valid
    get token() {
        //return null if token is not there or expired
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            return null;
        }
        return this._token;
    }

}
