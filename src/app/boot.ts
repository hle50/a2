import {bootstrap}    from '@angular/platform-browser-dynamic';
import {enableProdMode} from '@angular/core';
import {ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {HTTP_PROVIDERS} from '@angular/http';
import {GlobalService} from './shared/global.service';
import {AppComponent} from './app.component';
import {provide} from '@angular/core';

enableProdMode();
bootstrap(AppComponent, [ROUTER_PROVIDERS, HTTP_PROVIDERS,GlobalService]);