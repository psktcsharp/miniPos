import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Cashier } from './cashier.model';
import { map } from 'rxjs/operators';
import { Url } from 'url';
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, OnInit {
    ngOnInit(): void {

    }
    activeState: boolean
    constructor(private authService: AuthService, private router: Router) {
        console.log("*AUTHGUARD CHECKING IF WE ARE HAVE ACCESS*")
        this.authService.cashier.subscribe(cashier => {
            this.activeState = !!cashier;
        })

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
        console.log("*AUTHGUARD GETTING CAN ACTIVE STATE*")



        return !!JSON.parse(localStorage.getItem("cashierOut")) || !!this.activeState || this.router.createUrlTree(['/auth']);

    }

}