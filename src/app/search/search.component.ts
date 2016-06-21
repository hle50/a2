import {Component, OnInit,AfterViewInit, OnChanges } from '@angular/core';
import {ControlGroup, FormBuilder} from '@angular/common';
import {SearchService} from './search.service'
import {GlobalService} from "../shared/global.service";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';


@Component({
    selector: 'search',
    //templateUrl: 'app/search/search.template.html',
    template: `
    <section class="site-section site-section-light site-section-top">
    <div class="container text-center" style="padding-right: 0px">
        <div class="mobile-bar search-mobile-section">
            <div class="pull-right">
                <ul id="iconRightUL">
                    <li class="shopinfo">
                        <div class="shopper-icon-section">
                            <i class="top-deliver-icon"></i>
                        </div>
                        <div style="font-size: 12px;" class="text-logo">
                            <span class="shoppernumber">  1 shopper</span>
                        </div>
                    </li>
                    <!-- <li class="map">
                      <a class="product-selection-item dpt_department" href="#" data-id="0">
                        <img src="{{departmentIcon}}"/>
                        <span>Map</span>
                      </a>
                    </li> -->
                    <li class="time">
                        <i class="glyphicon glyphicon-time"></i>
                        <span>lllico</span>
                    </li>
                    <li class="location">
                        <i class="glyphicon glyphicon-map-marker"></i>
                        <span>D2</span>
                    </li>
                </ul>
            </div>
            <div class="pull-left search-group-section">
                <div class="input-group input-group-lg search-group">
                    <span class="hiddenSearch"></span>
                    <input type="text" id="productSearchBar" 
                           class="form-control productSearchBar productSearchBarWidth"
                           placeholder="Search products">
                </div>
            </div>
        </div>
        <div class="desktop-only search-desktop-section">
            <!--{{>mobileNav}}-->
            <div class="pull-right">
                <ul id="iconRightUL">
                    <li class="shopinfo">
                        <div class="shopper-icon-section">
                            <i class="top-deliver-icon"></i>
                        </div>
                        <div style="height: 13px;" class="text-logo">

                            <span class="shoppernumber"> 1 shopper</span>

                        </div>
                    </li>
                    <!-- <li class="map">
                      <a class="product-selection-item dpt_department" href="#" data-id="0">
                        <img src="{{departmentIcon}}"/>
                        <span>Map</span>
                      </a>
                    </li> -->
                    <li class="time">
                        <i class="glyphicon glyphicon-time"></i>
                        <span>lllico</span>
                    </li>
                    <li class="location">
                        <i class="glyphicon glyphicon-map-marker"></i>
                        <span>D2</span>
                    </li>
                </ul>
            </div>
            <div class="pull-left search-group-section">
                <form [ngFormModel]="form" class="input-group input-group-lg search-group">
                    <span class="hiddenSearch"></span>
                  
                    <input (keyup)="change()" type="text" id="productSearchBar" class="form-control productSearchBar"
                       ngControl="search"  placeholder="Search products1..">
                  
                    
                </form>
            </div>
        </div>
    </div>
</section>
    `,
    providers:[SearchService]    

})
export class SearchComponent implements OnInit,AfterViewInit {
    public limit:number = 20;
    public offset:number = 0;
    public search:string ='';
    ngOnInit() {
      
    }
    form: ControlGroup;
    constructor(fb: FormBuilder,private searchSerivce: SearchService, private share: GlobalService) {
        this.form = fb.group({
            search: []
        });
        
      
    }  
    ngAfterViewInit(){
           var search = this.form.find('search');
        search.valueChanges
        .debounceTime(400)
        .switchMap(x =>  this.searchSerivce.getSelection(this.offset,this.limit,x))
        .subscribe(data => this.share.setSearchResult(data.result));
    }
    change(){
        console.log('searching');
        this.share.setIsSearching(true);
    }
}