import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router-deprecated';
import {HomeService} from './home.service';
import {ProductComponent} from '../product/product.component';
import {SearchResultComponent} from '../shared/searchResult';
import {GlobalService} from "../shared/global.service";

@Component({
  //templateUrl: 'app/home/home.template.html',
  template: `

    <div *ngIf="!share.getIsSearching()" class="row store-items" id="selections_section">
        <div class="container">
            <div *ngFor="let item of data">


                <div *ngIf="item.count>0" class="row">
                    <div class="pull-left">
                        <aside class="sidebar site-block">
                            <div class="sidebar-block">
                                <ul class="store-menu shop-groups-menu">
                                    <li class="father-market-icon">
                                        <span>{{item.name}}</span>
                                    </li>
                                </ul>
                            </div>
                        </aside>
                    </div>
                    <div class="pull-left">

                            <a [routerLink]="['Cat',{cat: item.variant}]" type="button" class="btn btn-sm btn-block btn-success"
                                    style="margin-left:10px;">view more {{item.count}}
                            </a>

                    </div>
                </div>
                <div *ngIf="item.count>0" class="row">

                    <product [p]="p" *ngFor="let p of item.products"></product>



                </div>

            </div>

        </div>

    </div>
    <search-result  (window:scroll)="onScroll($event)"></search-result>

    `,
  providers: [HomeService],
  directives: [RouterLink, ProductComponent, SearchResultComponent]
})
export class HomeComponent implements OnInit {
  data;

  isLoading:boolean = false;
  constructor(private _service:HomeService, private share:GlobalService) {
    // this.router.changes.subscribe(val => console.log(val));
  }

  ngOnInit() {
    this.share.setHideWhenCheckOut(false);
    this.share.setIsSearching(false);
    this.share.setOffset(0);
    this.share.setIsEndSearching(false);
    this.share.setSearchResult([]);
    this._service.getSelection()
      .subscribe((data) => this.data = data.result);
  }

  onScroll() {
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
