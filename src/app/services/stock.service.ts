import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Injectable({
    providedIn: 'root'
})
export class StockService {

    uri = "https://localhost:80";

    constructor(private http: HttpClient) { }

    add_stock(obj) {
        this.http.post(`${this.uri}/stock`, obj)
            .subscribe(res => { console.log('Done'); alert('Склад был добавлен!') })
    }

    delete_stock(id) {
        return this
            .http
            .delete(`${this.uri}/stock/${id}`);
    }

    get_stocks() {
        return this
            .http
            .get(`${this.uri}/stock`);
    }

    edit_stock(id) {
        return this.http.get(`${this.uri}/stock/${id}`);
    }

    update_stock(obj, id) {
        this
            .http
            .put(`${this.uri}/stock/${id}`, obj)
            .subscribe(res => alert('Склад обновлен'))
    }

}