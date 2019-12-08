import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Injectable({
    providedIn: 'root'
})
export class SupplyService {

    uri = "https://localhost:80";

    constructor(private http: HttpClient) { }

    add_supply(obj) {
        this.http.post(`${this.uri}/supply`, obj)
            .subscribe(res => { console.log('Done'); alert('Поставка была добавлена!') })
    }

    delete_supply(id) {
        return this
            .http
            .delete(`${this.uri}/supply/${id}`);
    }

    get_supplies() {
        return this
            .http
            .get(`${this.uri}/supply`);
    }


    edit_supply(id) {
        return this.http.get(`${this.uri}/supply/${id}`);
    }

    update_supply(obj, id) {
        this
            .http
            .put(`${this.uri}/supply/${id}`, obj)
            .subscribe( res => alert('Поставка обновлена'))
    }

}