import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Injectable({
    providedIn: 'root'
})
export class ProductService {

    uri = "https://localhost:80";

    constructor(private http: HttpClient) { }

    add_product(obj) {
        this.http.post(`${this.uri}/product`, obj)
            .subscribe(res => { console.log('Done'); alert('Продукт был добавлен!') })
    }

    delete_product(id) {
        return this
            .http
            .delete(`${this.uri}/product/${id}`);
    }

    get_products() {
        return this
            .http
            .get(`${this.uri}/stock`);
    }

    edit_product(id) {
        return this.http.get(`${this.uri}/product/${id}`);
    }

    update_product(obj, id) {
        this
            .http
            .put(`${this.uri}/product/${id}`, obj)
            .subscribe(res => alert('Продукт обновлен'))
    }

}