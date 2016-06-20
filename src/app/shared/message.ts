import {Injectable} from '@angular/core';
@Injectable()
export class Message {

    cartUpdate:string = 'Your cart is updated';
    emptyCart:string = 'Your cart is empty now';
    itemRemoved:string = 'Item is removed from your cart';

    constructor() {

    }

    //getCartUpdateMessage() {
    //    return this.cartUpdate;
    //}
    //
    //getEmptyCartMessage() {
    //    return this.emptyCart;
    //}
    //
    //getItemRemovedMessage() {
    //    return this.itemRemoved;
    //}

}
