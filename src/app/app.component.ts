import {Component,ViewContainerRef} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';

import {NavComponent} from './nav/nav.component';
import {SearchComponent} from './search/search.component';
import {SideBarComponent} from './sidebar/sidebar.component';
import {CartComponent} from './cart/cart.component';
import {HomeComponent} from './home/home.component';
import {CatComponent} from './cat/cat.component';
import {CheckoutComponent} from './checkout/checkout.component';
import {GlobalService} from './shared/global.service';



@RouteConfig([
    {path: '/', name: 'Home', component: HomeComponent},
    {path: '/go/:cat', name: 'Cat', component: CatComponent},
    {path: '/checkout', name: 'Checkout', component: CheckoutComponent},
    // { path: '/users/:id', name: 'EditUser', component: UserFormComponent },
    // { path: '/users/new', name: 'NewUser', component: UserFormComponent },
    // { path: '/posts', name: 'Posts', component: PostsComponent },
    // { path: '/not-found', name: 'NotFound', component: NotFoundComponent },
    // { path: '/*other', name: 'Other', redirectTo: ['Home'] }
])
@Component({
    selector: 'my-app',
    //templateUrl:'./app/app.template.html',
    template: `
    <nav></nav>
<search *ngIf="!share.getHideWhenCheckOut()"></search>
<section class="site-section site-section-location">
    <div class="container">
        <div class="row">
            <div class="col-md-2">
                <div class="row">
                    <div class="col-md-12"><!-- TODO md-6 -->
          <span class="mini-cart-button">

        <a [routerLink]="['Home']" type="button" class="btn btn-sm btn-block btn-success"><i class="fa fa-home fa-lg"></i><span class="left-menu-name">HOME</span></a>

          </span>
                    </div>

                </div>
            </div>
            <div class="col-md-7">
                <div class="col-md-5 first-message">


                </div>
                <div class="col-md-2 ajax-loading-product">
                 <!--<i  class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>-->
                </div>
                <div class="col-md-5 first-message">

                </div>
            </div>

            <div class="col-md-3 desktop-only" style="padding-top: 14px">
                <span class="mini-cart-title">CART</span>
            </div>

        </div>
    </div>


</section>
<section class="site-content site-section">
    <div class="container">
        <div class="row">
            <side-bar *ngIf="!share.getHideWhenCheckOut()"></side-bar>



            <div class="{{!share.getHideWhenCheckOut() ? 'col-md-7 col-lg-7' : 'col-lg-12 col-md-12'}}">
                <router-outlet></router-outlet>
            </div>

            <cart *ngIf="!share.getHideWhenCheckOut()"></cart>
        </div>
    </div>
</section>
    `,
    directives: [NavComponent, SearchComponent, SideBarComponent, CartComponent, ROUTER_DIRECTIVES],
    providers: [GlobalService]
})
export class AppComponent {
    viewContainerRef;

    public constructor(viewContainerRef:ViewContainerRef, private share: GlobalService) {
        // You need this small hack in order to catch application root view container ref
        this.viewContainerRef = viewContainerRef;
    }

}
