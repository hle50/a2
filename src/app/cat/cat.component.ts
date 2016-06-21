import {Component, OnInit} from '@angular/core';
import {Router, RouteParams} from '@angular/router-deprecated';
import {CatService} from './cat.service';
import {ProductComponent} from '../product/product.component';
import {SearchResultComponent} from '../shared/searchResult';
import {GlobalService} from "../shared/global.service";
import * as _ from 'lodash';

@Component({
    template:`

<div  *ngIf="!share.getIsSearching()" (window:scroll)="onScroll($event)" class="row store-items" id="products_section">

    <product [p]="p" *ngFor="let p of data"></product>


</div>
<search-result  (window:scroll)="onScrollSearch($event)"></search-result>


    `,
    //templateUrl: 'app/cat/cat.template.html',
    providers: [CatService],
    directives: [ProductComponent,SearchResultComponent]

})
export class CatComponent implements OnInit {
    public data:any[] = [];
    public limit:number = 20;
    public offset:number = 0;
    public  isLoading:boolean = false;
    public ending:boolean = false;
    constructor(private _router:Router,
                private _routeParams:RouteParams,
                private _catService:CatService, private share:GlobalService) {

    }

    getData() {
        this.isLoading = true;
        var cat = this._routeParams.get("cat");
        if(this.ending)
        return;
        this._catService.getSelection(cat, this.offset, this.limit)
            .subscribe(data => {
                    if (this.data.length) {
                        if( data.status!='false'){
                            this.data = _.concat(this.data, data.result);
                        }
                        else{
                            this.ending = true;
                        }
                    }
                    else {
                        this.data = data.result;

                    }
                    this.isLoading = false;
                    this.offset += 20;
                }
            );
    }

    ngOnInit() {
        this.getData();
    }

    onScroll($event) {
        console.log(this.isLoading);
        if (((window.innerHeight + window.scrollY) >= (document.body.offsetHeight-400)) && !this.isLoading) {
            this.getData();

        }
    }

  onScrollSearch() {
    if (!this.share.getIsSearching() || !this.share.isEndSearching)
      return;
    if (((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 400)) && !this.isLoading) {
      this.isLoading = true;
      this.share.getSelection(this.share.getSearchValue())
        .subscribe((data) => {
          if(data.status == 'true'){
            let d = this.share.getSearchResult().concat(data.result);
            this.share.setSearchResult(d);
            this.share.setOffset(this.share.getOffest() + 20);
            this.isLoading = false;
            this.share.isEndSearching = data.status==='true';
          }

        });

    }
  }
}
