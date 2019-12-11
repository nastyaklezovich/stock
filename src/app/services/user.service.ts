import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Injectable({
    providedIn: 'root'
})
export class UserService {

    uri = "https://localhost:80";

    constructor(private http: HttpClient) { }

    add_user(obj) {
        this.http.post(`${this.uri}/user`, obj)
            .subscribe(res => { alert('Пользователь был добавлен!') })
    }

    delete_user(id) {
        return this
            .http
            .delete(`${this.uri}/user/${id}`);
    }

    get_users() {
        return this
            .http
            .get(`${this.uri}/user`);
    }

    edit_user(id) {
        return this.http.get(`${this.uri}/user/${id}`);
    }

    update_user(obj, id) {
        this
            .http
            .put(`${this.uri}/user/${id}`, obj)
            .subscribe( res => alert('Пользователь обновлен'))
    }



}