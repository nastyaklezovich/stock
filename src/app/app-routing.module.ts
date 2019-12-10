import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AdminComponent } from './admin/admin.component';
import { AddSupplyComponent } from './admin/add-supply/add-supply.component';
import { ViewSupplyComponent } from './admin/view-supply/view-supply.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ViewUsersComponent } from './admin/view-users/view-users.component';
import { AddStockComponent } from './admin/add-stock/add-stock.component';
import { ViewStockComponent } from './admin/view-stock/view-stock.component';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { ViewProductComponent } from './admin/view-product/view-product.component';
import { AddInventoryComponent } from './admin/add-inventory/add-inventory.component';
import { ViewInventoryComponent } from './admin/view-inventory/view-inventory.component';
import { AddPartnerComponent } from './admin/add-partner/add-partner.component';
import { ViewPartnerComponent } from './admin/view-partner/view-partner.component';
import { AddOrderComponent } from './admin/add-order/add-order.component';
import { ViewOrderComponent } from './admin/view-order/view-order.component';
import { UserComponent } from './user/user.component';
import { ChartsComponent } from './admin/charts/charts.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {
    path: "auth",
    component: AuthComponent
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "admin",
    component: AdminComponent,
    children: [
      {
        path: "add-supply",
        component: AddSupplyComponent
      },
      {
        path: "view-supply",
        component: ViewSupplyComponent
      },
      {
        path: "add-user",
        component: AddUserComponent
      },
      {
        path: "view-user",
        component: ViewUsersComponent
      },
      {
        path: "add-stock",
        component: AddStockComponent
      },
      {
        path: "view-stock",
        component: ViewStockComponent
      },
      {
        path: "add-product",
        component: AddProductComponent
      },
      {
        path: "view-product",
        component: ViewProductComponent
      },
      {
        path: "add-inventory",
        component: AddInventoryComponent
      },
      {
        path: "view-inventory",
        component: ViewInventoryComponent
      },
      {
        path: "add-partner",
        component: AddPartnerComponent
      },
      {
        path: "view-partner",
        component: ViewPartnerComponent
      },
      {
        path: "add-order",
        component: AddOrderComponent,
      },
      {
        path: "view-order",
        component: ViewOrderComponent
      },
      {
        path: "charts",
        component: ChartsComponent
      }
    ]
  },
  {
    path: "user",
    component: UserComponent,
    children: [
      {
        path: "add-supply",
        component: AddSupplyComponent
      },
      {
        path: "view-supply",
        component: ViewSupplyComponent
      },
      {
        path: "add-product",
        component: AddProductComponent
      },
      {
        path: "view-product",
        component: ViewProductComponent
      },
      {
        path: "add-inventory",
        component: AddInventoryComponent
      },
      {
        path: "view-inventory",
        component: ViewInventoryComponent
      },
      {
        path: "add-order",
        component: AddOrderComponent,
      },
      {
        path: "view-order",
        component: ViewOrderComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
