import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Injectable({
    providedIn: 'root'
})
export class InventoryService {

    uri = "https://localhost:80";

    constructor(private http: HttpClient) { }

    add_inventory(obj) {
        this.http.post(`${this.uri}/inventory`, obj)
            .subscribe(res => { console.log('Done'); alert('Инвентаризация был добавлен!') })
    }

    search_product(obj){
        return this.http.post(`${this.uri}/inventory/search`, obj);
    }

    delete_inventory(id) {
        return this
            .http
            .delete(`${this.uri}/inventory/${id}`);
    }

    get_inventories() {
        return this
            .http
            .get(`${this.uri}/inventory`);
    }

    edit_inventory(id) {
        return this.http.get(`${this.uri}/inventory/${id}`);
    }

    update_inventory(obj, id) {
        this
            .http
            .put(`${this.uri}/inventory/${id}`, obj)
            .subscribe(res => alert('Инвентаризация обновлен'))
    }

}