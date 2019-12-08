import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Injectable({
    providedIn: 'root'
})
export class OrderService {

    uri = "https://localhost:80";

    constructor(private http: HttpClient) { }

    add_order(obj) {
        this.http.post(`${this.uri}/order`, obj)
            .subscribe(res => { alert('Заказ был добавлен!') })
    }

    delete_order(id) {
        return this
            .http
            .delete(`${this.uri}/order/${id}`);
    }

    get_orders() {
        return this
            .http
            .get(`${this.uri}/order`);
    }

    edit_order(id) {
        return this.http.get(`${this.uri}/order/${id}`);
    }

    update_order(obj, id) {
        this
            .http
            .put(`${this.uri}/order/${id}`, obj)
            .subscribe( res => alert('Заказ обновлен'))
    }



}