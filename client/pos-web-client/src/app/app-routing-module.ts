import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { ItemsComponent } from './items/items.component';
import { SellComponent } from './sell/sell.component';
import { ReportComponent } from './report/report.component'
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
//register routes
const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'auth', component: AuthComponent },
    {
        path: 'items', component: ItemsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'sell', component: SellComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'report', component: ReportComponent,
        canActivate: [AuthGuard]
    }
]
@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}