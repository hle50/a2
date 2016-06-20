import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class HomeService {
    private _url = "http://catalogue.marketoi.com/index.php/api/Front/selection";

    constructor(private _http: Http){
    }

    getSelection(){
        return this._http.get(this._url).map(res => res.json());
    }

   
}
