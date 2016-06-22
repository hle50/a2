import {Component, OnInit} from '@angular/core'
import {GlobalService} from '../shared/global.service';
import {CanDeactivate, Router} from '@angular/router-deprecated';
import * as _ from 'lodash';
@Component({
  templateUrl: 'app/checkout/checkout.html',
  selector:'checkout',
  styles:['.site-section-top{margin-top: 12px !important;}']

})
export class CheckoutComponent implements OnInit {
  isFirstStep = true;

  constructor(private share:GlobalService, private router:Router) {

  }

  ngOnInit() {
    this.share.setHideWhenCheckOut(true);
    console.log(this.router);
  }

  removeItem(item) {

    var current = _.filter(this.share.getCart(), function (obj) {
      return obj.id != item.id;
    });
    this.share.updateCart(current);

  }

  up(item) {
    item.quantity += 1;

  }

  down(item) {
    if (item.quantity == 1)
      return;
    item.quantity -= 1;


  }
}
