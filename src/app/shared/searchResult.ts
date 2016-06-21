import {Component, Input, OnInit, OnChanges} from '@angular/core';
import {ProductComponent} from '../product/product.component';
import {GlobalService} from './global.service'

@Component({
    selector: 'search-result',
    template: `

    	 <div *ngIf="share.getIsSearching()" class="row store-items" id="selections_section">
 
        <div class="container">
        <div *ngFor="let p of share.getSearchResult()">
            <product [p]="p" ></product>
            </div>
        </div>
        <div>
    `,
    directives: [ProductComponent]

})
export class SearchResultComponent implements OnInit {
 

    constructor(private share: GlobalService) {

    }

    ngOnInit() {


    }

}