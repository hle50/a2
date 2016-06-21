import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SearchService {


    constructor(private _http:Http) {
    }

    getSelection(offset, limit,search) {
        let _url = "http://catalogue.marketoi.com/index.php/api/Front/products/?limit=" + limit + '&offset=' + offset+'&search='+search;
        return this._http.get(_url)
            .map(res => res.json());
    }


}
