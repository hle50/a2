import {Component, OnInit} from '@angular/core';
import {GlobalService} from '../shared/global.service';
import {RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';


@Component({
  selector: 'nav',
  //templateUrl: 'app/nav/nav.template.html',
  template: `
    <header style="background-color: #2d2c2f;">
    <div>
        <div class="col-xs-12 col-md-12 header-bar-section">
            <a href="/shoppingCart" class="pull-right cartIconHeader">
                <i class="shopping-cart-icon header"></i>
          <span class="label label-primary label-indicator top-right-number-notification
 animation-floating cartItemsCount">{{share.getCart().length}}</span>
            </a>
            <nav class="site-navigation-bar">
                <a href="javascript:void(0)" class="btn btn-default site-menu-toggle visible-xs visible-sm">
                    <i class="fa fa-bars"></i>
                </a>
                <ul class="site-nav">
                    <li class="visible-xs visible-sm">
                        <a href="javascript:void(0)" class="site-menu-toggle text-center">
                            <i class="fa fa-times"></i>
                        </a>
                    </li>
                    <li><a href="/about">About</a></li>
                    <li><a href="#">Support: 0126.449.2309</a></li>
                    <li><a href="http://apply.marketoi.com">Become a shopper</a></li>

                    <li><a href="/sign-in" class="log-in-option">Log In</a></li>
                    <li><a href="/sign-up" class="log-in-option">Sign Up</a></li>

                </ul>
            </nav>
            <span [routerLink]="['Home']" class="site-logo pointer"><span class="main-logo"></span></span>
        </div>
    </div>
</header>
    `,
  directives: [ROUTER_DIRECTIVES],

})
export class NavComponent {
  constructor(private share:GlobalService) {

  }
}
