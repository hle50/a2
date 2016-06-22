import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {MODAL_DIRECTVES, BS_VIEW_PROVIDERS} from 'ng2-bootstrap/ng2-bootstrap';
import {GlobalService} from "../shared/global.service";
import {Message} from '../shared/message';
import * as _ from 'lodash';

@Component({
  selector: 'product',
  //templateUrl: 'app/product/product.template.html',
  template: `
    <div  class="col-sm-6 col-md-4 col-lg-3"
     data-toggle="animation-appear"
     style="padding: 5px !important;" data-animation-class="animation-fadeInQuick"
     data-element-offset="-100">
    <div class="store-item" data-action="openProductModalDetails">

        <div class="store-item-image">

                <img (click)="lgModal.show()" src="{{p.icon_path}}"
                     alt="" height="480" class="img-responsive pointer">

        </div>
        <div class="store-item-info clearfix" style="font-size: 12px; height: 120px">
            <div>
                <a href="#">
                    <p class="product-name">
                        <strong>{{p.name}}</strong>
                    </p>
                </a>
            </div>
            <div class="clearfix">
                <span class="container-of-amount"><a href="#" class="text-muted">{{p.amount}} {{p.unit}}</a></span>
                                                <span class="container-of-amount short-text"><a href="#"
                                                                                     class="text-muted">{{p.shops_label}}</a></span>
                <span class="store-item-price themed-color-dark">{{p.price}} VND</span>
            </div>
        </div>
    </div>
</div>

<div (onShow)="onShow()" bsModal #lgModal="bs-modal" id="productDetailsModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
    <div class="vertical-alignment-helper">
    <div class="modal-dialog vertical-align-center modal-padd">
        <div class="modal-content">

            <div class="modal-body">
                <form  id="frm_addToCart">
                    <div class="row modal_border_product">
                        <div class="col-md-6">
                            <div class="store-item-image">
                                <a href="#"><img src="{{p.icon_path}}" alt="" class="img-responsive"></a>
                            </div>
                            <div class="store-item-info clearfix">
                                <a href="#">

                                    <p class="product-name">{{p.brand}}</p>

                                    <p class="product-name"><strong>{{p.name}}</strong></p>
                                    <p class="product-name">{{p.amount}} {{p.unit}}</p>
                                </a>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="row">
                                <div class="store-item-price themed-color-dark pull-right">
                                    <div class="col-md-12">{{p.price }} VND</div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="pull-right">
                                    <label class="col-md-3 col-xs-6 control-label product_qty" for="product_qty">Qty</label>
                                    <div class="col-md-9 col-xs-6">
                                        <input min="1" [(ngModel)]="quantity" type="number" id="product_qty" name="product_qty" class="form-control">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <p class="product-description"></p>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-8">
                            <div class="col-md-12">
                                <div class="col-md-8" style="margin-bottom: 10px">
                                    <ul class="list-shop-item">

                                        <li>
                                            <div>
                                                <span><img src="{{p.thumb}}" style="width: 50px; height: 50px"></span>
                                                <span>{{p.shops_label}}</span>
                                            </div>
                                        </li>

                                    </ul>
                                </div>
                                <div class="col-md-4" style="margin-bottom: 10px">

                                </div>
                            </div>

                        </div>
                        <div class="col-md-4">
                            <div class="col-md-12">
                                <div>
                                    <button (click)="addToCart()" type="button" class="btn btn-lg btn-block btn-default addToCartBtn" data-loading-text="Adding..." style="height: 86px;">Add To Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    </div>
</div>

    `,
  directives: [MODAL_DIRECTVES],
  viewProviders: [BS_VIEW_PROVIDERS],
  providers: [Message]

})
export class ProductComponent {
  quantity = 1;
  @Input() p;
  @ViewChild('lgModal') bgModel;

  constructor(private share:GlobalService, private message:Message) {

  }

  onShow() {
    this.quantity = 1;
  }

  addToCart() {
    let id = this.p.id;
    let currentCart = this.share.getCart();

    var existed = _.find(currentCart, function (obj) {
      return obj.id == id;
    });

    if (existed) {
      existed.quantity += _.cloneDeep(this.quantity);
      this.share.updateCart(currentCart);
    }
    else {
      let obj = {
        id: this.p.id,
        quantity: _.cloneDeep(this.quantity),
        price: this.p.price,
        product: this.p
      };

      this.share.setCart(obj);
    }

    this.bgModel.hide();

  }


}
/**
 * Created by hoale on 6/16/2016.
 */
