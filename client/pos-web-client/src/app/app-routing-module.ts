import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { ItemsComponent } from './items/items.component';
import { SellComponent } from './sell/sell.component';
//register routes
const appRoutes: Routes = [
    { path: '', component: AppComponent },
    { path: 'auth', component: AuthComponent },
    { path: 'items', component: ItemsComponent },
    { path: 'sell', component: SellComponent }
]
@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}