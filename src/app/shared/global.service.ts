import {Injectable} from '@angular/core';
import * as _ from 'lodash';
@Injectable()
export class GlobalService {
    isSearching:boolean =false;
    searchResult:any [];
    cart:any[] = [];
    message:{} = {
        cartUpdate: 'Your cart is updated',
        emptyCart: 'Your cart is empty now',
        itemRemoved: 'Item is removed from your cart',

    };

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
    
    setSearchResult(result){
        this.searchResult = result;
    }
     getSearchResult(){
        return this.searchResult;
    }
    
    getIsSearching(){
        return this.isSearching;
    }
    setIsSearching(value){
        this.isSearching = value;
    }
}
