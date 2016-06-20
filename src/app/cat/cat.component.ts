import {Component, OnInit} from '@angular/core';
import {Router, RouteParams} from '@angular/router-deprecated';
import {CatService} from './cat.service';
import {ProductComponent} from '../product/product.component';
import * as _ from 'lodash';

@Component({
    template:`

<div  (window:scroll)="onScroll($event)" class="row store-items" id="products_section">

    <product [p]="p" *ngFor="let p of data"></product>


</div>


    `,
    //templateUrl: 'app/cat/cat.template.html',
    providers: [CatService],
    directives: [ProductComponent]

})
export class CatComponent implements OnInit {
    public data:any[] = [];
    public limit:number = 20;
    public offset:number = 0;
    public  isLoading:boolean = false;
    public ending:boolean = false;
    constructor(private _router:Router,
                private _routeParams:RouteParams,
                private _catService:CatService) {

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
}