import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderSiteComponent } from './order-site.component';

const routes: Routes = [
    { path: 'order', component: OrderSiteComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class OrderRoutingModule {

}

