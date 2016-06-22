import {Injectable} from '@angular/core';
import * as _ from 'lodash';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class GlobalService {
  isSearching:boolean = false;
  searchResult:any [];
  cart:any[] = [];
  searchValue:string = '';
  limit:number = 20;
  offset:number = 0;
  hideWhenCheckOut:boolean = false;
  isEndSearching:boolean = false;
  message:{} = {
    cartUpdate: 'Your cart is updated',
    emptyCart: 'Your cart is empty now',
    itemRemoved: 'Item is removed from your cart',

  };

  constructor(private _http:Http) {
  }

  getMessage() {
    return this.message;
  }

  setCart(item) {
    this.cart.push(item);
  }

  getCart() {
    return this.cart;
  }

  updateCart(cart) {
    this.cart = cart;
  }

  totalPrice() {
    if (!this.cart.length) {
      return 0;
    }
    else {
      return _.sumBy(this.cart, function (o) {
        return (o.price * o.quantity);
      })
    }
  }

  setSearchResult(result) {
    this.searchResult = result;
  }

  getSearchResult() {
    return this.searchResult;
  }

  getIsSearching() {
    return this.isSearching;
  }

  setIsSearching(value) {
    this.isSearching = value;
  }

  setSearchValue(v) {
    this.searchValue = v;
  }

  getSearchValue() {
    return this.searchValue;
  }

  getOffest() {
    return this.offset;
  }

  setOffset(o) {
    this.offset = o;
  }

  setIsEndSearching(v) {
    this.isEndSearching = v;
  }

  getIsEndSearching() {
    return this.isEndSearching;
  }

  getSelection(search) {
    this.setSearchValue(search);
    let _url = "http://catalogue.marketoi.com/index.php/api/Front/products/?limit=" + this.limit + '&offset=' + this.offset + '&search=' + search;
    return this._http.get(_url)
      .map(res => res.json());
  }
  getHideWhenCheckOut(){
    return this.hideWhenCheckOut;
  }
  setHideWhenCheckOut(value){
    this.hideWhenCheckOut = value;
  }
}
