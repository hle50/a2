import {Component, Input, OnInit, OnChanges} from '@angular/core';
import {ProductComponent} from '../product/product.component';
import {GlobalService} from './global.service'

@Component({
  selector: 'search-result',
  template: `

    	 <div *ngIf="share.getIsSearching()" class="row store-items" id="selections_section">
          <div class="row">
          <div class="pull-left" style="margin-left:20px;">
            <aside class="sidebar site-block">
              <div class="sidebar-block">
                <ul class="store-menu shop-groups-menu">
                  <li class="father-market-icon">
                    <span>search results</span>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
       </div>
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


  constructor(private share:GlobalService) {

  }

  ngOnInit() {


  }

}
