import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpResponse,
  HttpHeaders,
  HttpParams,
  HttpRequest
} from "@angular/common/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/internal/Observable";
import { GLOBAL } from "./global";

@Injectable({
  providedIn: "root"
})
export class AnimalService {
  private url;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }
  addAnimal(token, animal) {
    let params = JSON.stringify(animal);
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: token
    });
    return this._http
      .post(this.url + "animal", params, { headers: headers })
      .map(res => res);
  }

  getAnimals() {
    let headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    // let options =
    return this._http.get(this.url + "animals").map(res => res);
  }

  getAnimal(id) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    // let options =
    return this._http.get(this.url + "animal/" + id).map(res => res);
  }

  editAnimal(token, id, animal) {
    let params = JSON.stringify(animal);
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: token
    });
    return this._http
      .put(this.url + "update-animal/" + id, params, { headers: headers })
      .map(res => res);
  }

  deleteAnimal(token, id) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: token
    });
    // let options = new HttpRequest()
    return this._http
      .delete(this.url + "animal/"+id, { headers: headers })
      .map(res => res);
  }
}
