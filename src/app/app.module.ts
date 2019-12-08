import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS, /* other http imports */ } from "@angular/common/http";
import { Routes, RouterModule } from '@angular/router';
import { AuthInterceptor } from './core/middleware';
import { ModalModule } from "ngx-bootstrap/modal";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
    AdminComponent,
    AddSupplyComponent,
    ViewSupplyComponent,
    AddUserComponent,
    ViewUsersComponent,
    AddStockComponent,
    ViewStockComponent,
    AddProductComponent,
    ViewProductComponent,
    AddInventoryComponent,
    ViewInventoryComponent,
    AddPartnerComponent,
    ViewPartnerComponent,
    AddOrderComponent,
    ViewOrderComponent,
    UserComponent,
  ],
  imports: [
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    ModalModule.forRoot(),    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
