import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CatService {


    constructor(private _http:Http) {
    }

    getSelection(cat, offset, limit) {
        let _url = "http://catalogue.marketoi.com/index.php/api/Front/products/?go=" + cat + '&limit=' + limit + '&offset=' + offset;
        return this._http.get(_url)
            .map(res => res.json());
    }


}
