import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { ItemsComponent } from './items/items.component';
import { SellComponent } from './sell/sell.component';
import { ReportComponent } from './report/report.component'
import { HomeComponent } from './home/home.component';
//register routes
const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'auth', component: AuthComponent },
    { path: 'items', component: ItemsComponent },
    { path: 'sell', component: SellComponent },
    { path: 'report', component: ReportComponent }
]
@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}