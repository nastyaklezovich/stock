import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Injectable({
    providedIn: 'root'
})
export class PartnerService {

    uri = "https://localhost:80";

    constructor(private http: HttpClient) { }

    add_partner(obj) {
        this.http.post(`${this.uri}/partner`, obj)
            .subscribe(res => { alert('Контрагент был добавлена!') })
    }

    delete_partner(id) {
        return this
            .http
            .delete(`${this.uri}/partner/${id}`);
    }

    get_partners() {
        return this
            .http
            .get(`${this.uri}/partner`);
    }

    get_provider(){
        return this
            .http
            .get(`${this.uri}/partner/provider`);
    }

    get_customer(){
        return this
        .http
        .get(`${this.uri}/partner/customer`);
    }

    edit_partner(id) {
        return this.http.get(`${this.uri}/partner/${id}`);
    }

    update_partner(obj, id) {
        this
            .http
            .put(`${this.uri}/partner/${id}`, obj)
            .subscribe( res => alert('Контрагент обновлен'))
    }



}